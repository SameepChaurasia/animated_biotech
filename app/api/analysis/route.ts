import { NextResponse } from "next/server";
import { calculateThermodynamics } from "@/lib/bioinformatics/thermodynamics";
import { alignSequences } from "@/lib/bioinformatics/alignment";
import { designGuideRNAs } from "@/lib/bioinformatics/crispr";
import { findCutSites, simulateDigestion } from "@/lib/bioinformatics/restriction";
import { findORFs } from "@/lib/bioinformatics/orf";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { operation, sequence, seq1, seq2, mode, enzymes, isCircular, minScore, minAminoAcids } = body;

    let result: any = null;

    switch (operation) {
      case "thermodynamics":
        if (!sequence) {
          return NextResponse.json({ success: false, error: "Sequence required for thermodynamics" }, { status: 400 });
        }
        result = calculateThermodynamics(sequence);
        break;

      case "alignment":
        if (!seq1 || !seq2) {
          return NextResponse.json({ success: false, error: "Both seq1 and seq2 are required for alignment" }, { status: 400 });
        }
        result = alignSequences(seq1, seq2, mode || "global");
        break;

      case "crispr":
        if (!sequence) {
          return NextResponse.json({ success: false, error: "Target sequence required for CRISPR guide design" }, { status: 400 });
        }
        result = designGuideRNAs(sequence, minScore || 40);
        break;

      case "restriction":
        if (!sequence) {
          return NextResponse.json({ success: false, error: "Sequence required for restriction digest" }, { status: 400 });
        }
        result = {
          cutSites: findCutSites(sequence, enzymes || []),
          fragments: simulateDigestion(sequence, enzymes || [], Boolean(isCircular)),
        };
        break;

      case "orf":
        if (!sequence) {
          return NextResponse.json({ success: false, error: "Sequence required for ORF translation" }, { status: 400 });
        }
        result = findORFs(sequence, minAminoAcids || 10);
        break;

      default:
        return NextResponse.json(
          { success: false, error: `Invalid operation: ${operation}. Must be one of: thermodynamics, alignment, crispr, restriction, orf.` },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, operation, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
