import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { RESEARCH_PAPERS, ResearchPaper } from "@/data/researchData";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;

    let papers: any[] = [];

    try {
      const where: any = {};
      if (category && category !== "All") {
        where.category = category;
      }
      if (search && search.trim().length > 0) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { abstract: { contains: search, mode: "insensitive" } },
          { authors: { contains: search, mode: "insensitive" } },
          { doi: { contains: search, mode: "insensitive" } },
        ];
      }

      papers = await prisma.researchPaper.findMany({
        where,
        take: limit,
        orderBy: [{ year: "desc" }, { createdAt: "desc" }],
      });
    } catch (dbError) {
      console.warn("PostgreSQL research fetch failed, using fallback:", dbError);
      // Fallback to static data
      papers = RESEARCH_PAPERS.filter((pub: ResearchPaper) => {
        const matchesCat = !category || category === "All" || pub.category === category;
        const matchesSearch =
          !search ||
          pub.title.toLowerCase().includes(search.toLowerCase()) ||
          pub.abstract.toLowerCase().includes(search.toLowerCase()) ||
          pub.authors.toLowerCase().includes(search.toLowerCase());
        return matchesCat && matchesSearch;
      });
      if (limit) papers = papers.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      count: papers.length,
      data: papers,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      category = "Protein Design",
      journal,
      doi,
      year = new Date().getFullYear().toString(),
      authors,
      abstract,
      readTime = "8 min read",
      impactFactor = "18.4",
      keyTakeaway,
      downloadSize = "4.5 MB PDF",
      highlights = [],
      specs,
      interactiveParams,
      whitepaper,
      labProtocol,
    } = body;

    if (!title || !abstract) {
      return NextResponse.json(
        { success: false, error: "Title and Abstract are required fields." },
        { status: 400 }
      );
    }

    const assignedDoi = doi || `10.1038/codex-${Date.now()}`;
    const paperId = `paper-${Date.now()}`;

    const newPaper = await prisma.researchPaper.create({
      data: {
        id: paperId,
        title,
        category,
        journal: journal || "Codex Bio Open Science Journal (2026)",
        doi: assignedDoi,
        year,
        authors: authors || "Sameep Chaurasia et al.",
        abstract,
        readTime,
        impactFactor,
        keyTakeaway: keyTakeaway || abstract.substring(0, 120) + "...",
        downloadSize,
        highlights: highlights.length > 0 ? highlights : [
          "High-affinity binding validation via surface plasmon resonance.",
          "Sub-angstrom crystallography alignment.",
          "Accelerated in silico hit-to-lead evolution.",
        ],
        specs: specs || [
          { label: "Predictive Accuracy", value: "98.7%", detail: "In vitro binding affinity match" },
          { label: "Throughput", value: "50K/hr", detail: "Parallel GPU bio-tensor kernels" },
        ],
        interactiveParams: interactiveParams || {
          bindingAffinity: { min: 0.01, max: 10.0, default: 0.42, unit: "nM" },
          foldingRmsd: { min: 0.1, max: 2.0, default: 0.38, unit: "Å" },
          throughputSpeed: { min: 1000, max: 100000, default: 50000, unit: "mol/hr" },
          offTargetTox: { min: 0.1, max: 5.0, default: 0.8, unit: "%" },
        },
        whitepaper: whitepaper || {
          doi: assignedDoi,
          journal: journal || "Codex Bio Open Science Journal",
          publicationDate: `${year}`,
          authors: [authors || "Sameep Chaurasia"],
          citations: 1,
          downloadUrl: "#",
          keyFindings: [keyTakeaway || "Empirically validated biological synthesis."],
        },
        labProtocol: labProtocol || {
          assayType: "Surface Plasmon Resonance (SPR)",
          temperature: "25.0°C",
          ph: "7.40",
          roboticPlatform: "Tecan Fluent 1080",
          incubationTime: "45 Minutes",
        },
      },
    });

    return NextResponse.json({ success: true, data: newPaper }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
