import { NextResponse } from "next/server";
import { prisma, mockDb } from "@/lib/prisma";
import { calculateThermodynamics } from "@/lib/bioinformatics/thermodynamics";
import { publishBiotechEvent, KAFKA_TOPICS } from "@/lib/kafka";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    let sequences = [];
    try {
      sequences = await prisma.sequence.findMany({
        where: projectId ? { projectId } : undefined,
        orderBy: { createdAt: "desc" },
      });
    } catch {
      sequences = projectId
        ? mockDb.sequences.filter((s) => s.projectId === projectId)
        : mockDb.sequences;
    }

    return NextResponse.json({ success: true, count: sequences.length, data: sequences });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, nucleotides, type = "DNA", projectId, notes } = body;

    if (!nucleotides || nucleotides.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Nucleotide sequence is required" }, { status: 400 });
    }

    const cleanSeq = nucleotides.toUpperCase().replace(/[^ATCGU]/g, "");
    const metrics = calculateThermodynamics(cleanSeq);
    const accession = `CB-SEQ-${Math.floor(1000 + Math.random() * 9000)}`;

    let newSequence;
    try {
      newSequence = await prisma.sequence.create({
        data: {
          name: name || `Sequence ${accession}`,
          accession,
          nucleotides: cleanSeq,
          type,
          length: metrics.length,
          gcContent: metrics.gcContent,
          meltingTemp: metrics.meltingTemp,
          freeEnergy: metrics.freeEnergy,
          notes,
          projectId: projectId || null,
          userId: "user_default",
        },
      });
    } catch {
      newSequence = {
        id: `seq_${Date.now()}`,
        name: name || `Sequence ${accession}`,
        accession,
        nucleotides: cleanSeq,
        type,
        length: metrics.length,
        gcContent: metrics.gcContent,
        meltingTemp: metrics.meltingTemp,
        freeEnergy: metrics.freeEnergy,
        notes,
        projectId: projectId || null,
        userId: "user_default",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockDb.sequences.unshift(newSequence);
      mockDb.activities.unshift({
        id: `act_${Date.now()}`,
        action: "CREATED_SEQUENCE",
        entityType: "Sequence",
        entityId: newSequence.id,
        details: { name: newSequence.name, accession },
        userId: "user_default",
        createdAt: new Date().toISOString(),
      });
    }

    // Publish event to Kafka
    await publishBiotechEvent(KAFKA_TOPICS.SEQUENCE_ANALYSIS_REQUESTED, {
      sequenceId: newSequence.id,
      accession,
      length: cleanSeq.length,
    });

    return NextResponse.json({ success: true, data: newSequence, metrics }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
