import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { RESEARCH_DETAILS, RESEARCH_PAPERS } from "@/data/researchData";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let paper: any = null;

    try {
      paper = await prisma.researchPaper.findFirst({
        where: {
          OR: [{ id }, { doi: id }],
        },
      });
    } catch (dbError) {
      console.warn("DB lookup failed for paper id:", id, dbError);
    }

    if (!paper) {
      // Fallback to in-memory research details or papers
      if (RESEARCH_DETAILS[id]) {
        paper = RESEARCH_DETAILS[id];
      } else {
        const p = RESEARCH_PAPERS.find((item) => item.id === id || item.doi === id);
        if (p) {
          paper = {
            ...p,
            highlights: [
              "Empirical sub-angstrom crystallography convergence.",
              "High-throughput automated robotic assay validation.",
              "Zero-shot de novo affinity optimization.",
            ],
            specs: [
              { label: "Accuracy", value: "98.7%", detail: "In vitro binding affinity match" },
              { label: "Throughput", value: "50K/hr", detail: "Parallel GPU tensor kernels" },
            ],
            whitepaper: {
              doi: p.doi,
              journal: p.journal,
              publicationDate: p.year,
              authors: [p.authors],
              citations: 42,
              downloadUrl: "#",
              keyFindings: [p.keyTakeaway],
            },
          };
        }
      }
    }

    if (!paper) {
      return NextResponse.json({ success: false, error: "Research publication not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: paper });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await prisma.researchPaper.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.category && { category: body.category }),
        ...(body.journal && { journal: body.journal }),
        ...(body.abstract && { abstract: body.abstract }),
        ...(body.keyTakeaway && { keyTakeaway: body.keyTakeaway }),
        ...(body.highlights && { highlights: body.highlights }),
        ...(body.specs && { specs: body.specs }),
        ...(body.interactiveParams && { interactiveParams: body.interactiveParams }),
        ...(body.whitepaper && { whitepaper: body.whitepaper }),
        ...(body.labProtocol && { labProtocol: body.labProtocol }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.researchPaper.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Publication removed" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
