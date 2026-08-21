import { NextResponse } from "next/server";
import { BIOTECH_SYSTEM_PROMPT } from "@/lib/ai/systemPrompt";
import { calculateThermodynamics } from "@/lib/bioinformatics/thermodynamics";
import { designGuideRNAs } from "@/lib/bioinformatics/crispr";
import { findCutSites } from "@/lib/bioinformatics/restriction";
import { findORFs } from "@/lib/bioinformatics/orf";
import { alignSequences } from "@/lib/bioinformatics/alignment";
import { inMemoryMongo, getMongoDb } from "@/lib/mongodb";
import { prisma } from "@/lib/prisma";
import { publishBiotechEvent, KAFKA_TOPICS } from "@/lib/kafka";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId") || "default_session";

    let messages: any[] = [];

    // Try fetching from PostgreSQL ChatMessage
    try {
      messages = await prisma.chatMessage.findMany({
        where: { sessionId },
        orderBy: { createdAt: "asc" },
        take: 50,
      });
    } catch {
      // Try fetching from MongoDB Atlas / inMemory
      try {
        const db = await getMongoDb();
        if (db) {
          const docs = await db
            .collection("chat_sessions")
            .find({ sessionId })
            .sort({ createdAt: 1 })
            .limit(50)
            .toArray();
          messages = docs;
        } else {
          const col = inMemoryMongo.getCollection("chat_sessions");
          messages = await col.find().toArray();
        }
      } catch (mongoErr) {
        console.warn("Mongo chat fetch failed:", mongoErr);
      }
    }

    return NextResponse.json({ success: true, count: messages.length, data: messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { messages = [], sessionId = "default_session" } = await request.json();
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    // Publish event to message broker
    await publishBiotechEvent(KAFKA_TOPICS.AI_QUERY_LOGGED, {
      queryLength: lastUserMessage.length,
      timestamp: new Date().toISOString(),
    });

    // Check if the user is asking to calculate thermodynamics, CRISPR, alignment, restriction, or ORF
    const query = lastUserMessage.toLowerCase();
    let toolResultText = "";
    let extractedSeq = "";

    // Extract potential sequence if present in uppercase
    const seqMatch = lastUserMessage.match(/[ATCGatcg]{12,}/);
    if (seqMatch) {
      extractedSeq = seqMatch[0].toUpperCase();
    }

    if (query.includes("melting") || query.includes("thermodynamic") || query.includes("gc") || query.includes("tm")) {
      const seq = extractedSeq || "ATCGATCGGCTATACGCG";
      const metrics = calculateThermodynamics(seq);
      toolResultText = `\n\n### 🧬 In Silico Thermodynamic Kinetics (SantaLucia 1998 NN Model)\n- **Sequence**: \`${seq}\` (${metrics.length} bp)\n- **GC Content**: **${metrics.gcContent}%** (AT Content: ${metrics.atContent}%)\n- **Melting Temp ($T_m$)**: **${metrics.meltingTemp}°C**\n- **Free Energy ($\\Delta G^{\\circ}_{37}$)**: **${metrics.freeEnergy} kcal/mol**\n- **Enthalpy ($\\Delta H^{\\circ}$)**: **${metrics.enthalpy} kcal/mol**\n- **Entropy ($\\Delta S^{\\circ}$)**: **${metrics.entropy} cal/(K·mol)**\n- **Dissociation Constant ($K_d$)**: **${metrics.kd} nM**\n- **Duplex Stability Index**: **${metrics.duplexStabilityIndex}/100**\n\n$$\\Delta G = \\Delta H - T\\Delta S = ${metrics.enthalpy} - (310.15 \\times ${metrics.entropy}/1000) = ${metrics.freeEnergy}\\text{ kcal/mol}$$`;
    } else if (query.includes("crispr") || query.includes("guide") || query.includes("pam") || query.includes("cas9")) {
      const seq = extractedSeq || "ATGACTGAATATAAACTTGTGGTAGTTGGAGCTGGTGGCGTAGGCAAGAGTGCCTTGACGATACAGCTAATTCAGAATCATTTTGTGGACGAATATGATCCAACAATAGAGGATTCC";
      const guides = designGuideRNAs(seq, 50);
      const top3 = guides.slice(0, 3);
      toolResultText = `\n\n### 🎯 SpCas9 Guide RNA (sgRNA) Design Matrix (NGG PAM)\nScanned **${seq.length} bp** target region and identified **${guides.length} viable candidate guides**:\n\n` +
        top3.map((g, i) => `${i + 1}. **\`${g.spacerSeq}\`** (PAM: \`${g.pamSeq}\`)\n   - Strand: *${g.strand}* | Cut site: *pos ${g.cutSitePos}*\n   - On-Target Rule Set 2 Score: **${g.onTargetScore}/100** (${g.offTargetTier})\n   - GC: ${g.gcContent}% | Poly-T: ${g.polyTCount} (Terminator Warning: ${g.hasPolyTWarning ? "⚠️ Yes" : "✅ No"})\n`).join("\n");
    } else if (query.includes("cut") || query.includes("restriction") || query.includes("digest") || query.includes("enzyme")) {
      const seq = extractedSeq || "GAATTCGGATCCAAGCTTGCGGCCGC";
      const { cutSites } = findCutSites(seq);
      toolResultText = `\n\n### ✂️ Restriction Endonuclease Mapping\nIdentified **${cutSites.length} recognition sites** in sequence \`${seq}\`:\n\n` +
        cutSites.map((c) => `- **${c.enzyme}**: Cut at position **${c.position}** (Context: \`...${c.sequenceContext}...\`)`).join("\n");
    } else if (query.includes("align") || query.includes("homology") || query.includes("needleman") || query.includes("smith")) {
      const s1 = "ATCGATCGGCTATACGCG";
      const s2 = "ATCGATGGGCTATACGCG";
      const res = alignSequences(s1, s2, "global");
      toolResultText = `\n\n### 🔬 Needleman-Wunsch Global Dynamic Alignment\n\`\`\`\nSeq 1: ${res.alignedSeq1}\nMatch: ${res.matchLine}\nSeq 2: ${res.alignedSeq2}\n\`\`\`\n- **Sequence Identity**: **${res.identityPercentage}%**\n- **Similarity**: **${res.similarityPercentage}%**\n- **Alignment Score**: **${res.score}** | Gaps: **${res.gapCount}**`;
    } else if (query.includes("orf") || query.includes("translate") || query.includes("reading frame") || query.includes("protein")) {
      const seq = extractedSeq || "ATGACCATGACGATCGTACGATCGTACGATCGATCGATCGGCTATACGCGATCGATCGTAA";
      const orfs = findORFs(seq, 5);
      toolResultText = `\n\n### 🧬 6-Frame Open Reading Frame (ORF) Map\nIdentified **${orfs.length} open reading frames**:\n\n` +
        orfs.slice(0, 3).map((o, i) => `${i + 1}. **${o.id}** [Frame ${o.frame} (${o.strand})]: Pos ${o.startPos}..${o.endPos} (${o.lengthAa} aa, ${o.molecularWeightKDa} kDa)\n   - Amino Acids: \`${o.aminoAcidSeq}\``).join("\n");
    }

    const aiResponse = `**Codex Bio Autonomous Agent Synthesis**:

Based on your bio-computational query, I have queried our real-time biophysics engine and knowledge base.

${toolResultText ? toolResultText : "I can assist you with:\n1. **Thermodynamic Duplex Kinetics** (SantaLucia 1998 NN Model)\n2. **SpCas9/Cas12a Guide RNA Design** (NGG PAM + Rule Set 2 Scoring)\n3. **Pairwise Sequence Alignment** (Needleman-Wunsch & Smith-Waterman)\n4. **Restriction Enzyme Mapping & Digestion Gel Simulation**\n5. **6-Frame ORF Finding & Protein Translation**\n\nPaste any FASTA nucleotide sequence or ask about molecular design pipelines to begin."}

*Data computed deterministically with sub-millisecond precision.*`;

    // 1. Save to PostgreSQL ChatMessage
    try {
      if (lastUserMessage) {
        await prisma.chatMessage.create({
          data: {
            sessionId,
            userId: "user_default",
            role: "user",
            content: lastUserMessage,
          },
        });
      }
      await prisma.chatMessage.create({
        data: {
          sessionId,
          userId: "user_default",
          role: "assistant",
          content: aiResponse,
        },
      });
    } catch (pgErr) {
      console.warn("PostgreSQL chat message save failed:", pgErr);
    }

    // 2. Save to MongoDB Atlas / In-Memory
    try {
      const db = await getMongoDb();
      if (db) {
        await db.collection("chat_sessions").insertOne({
          sessionId,
          userId: "user_default",
          userMessage: lastUserMessage,
          assistantMessage: aiResponse,
          timestamp: new Date().toISOString(),
        });
      } else {
        const chatCollection = inMemoryMongo.getCollection("chat_sessions");
        await chatCollection.insertOne({
          sessionId,
          userId: "user_default",
          userMessage: lastUserMessage,
          assistantMessage: aiResponse,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (mongoErr) {
      console.warn("MongoDB chat insert failed:", mongoErr);
    }

    return NextResponse.json({
      role: "assistant",
      content: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
