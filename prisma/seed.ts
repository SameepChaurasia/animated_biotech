import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { RESEARCH_PAPERS, RESEARCH_DETAILS } from "../data/researchData";
import { STATS } from "../data/content";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_6dCIuMF1ASHt@ep-mute-wildflower-az8khpg5-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting Codex Bio Database Seed...");

  // 1. Seed or Upsert Default User
  const defaultUser = await prisma.user.upsert({
    where: { clerkId: "user_default" },
    update: {
      displayName: "Lead Geneticist Sameep Chaurasia",
      email: "research@codexbio.ai",
      institution: "Codex Bio Discovery Institute",
      role: "LAB_DIRECTOR",
    },
    create: {
      id: "user_default",
      clerkId: "user_default",
      email: "research@codexbio.ai",
      displayName: "Lead Geneticist Sameep Chaurasia",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80",
      institution: "Codex Bio Discovery Institute",
      role: "LAB_DIRECTOR",
    },
  });
  console.log(`✅ Default User created/verified: ${defaultUser.displayName} (${defaultUser.id})`);

  // 2. Seed Research Publications & Monographs
  console.log("📚 Seeding Research Publications & Monographs...");
  for (const paper of RESEARCH_PAPERS) {
    const detail = RESEARCH_DETAILS[paper.id] || RESEARCH_DETAILS["protein-engine"];

    await prisma.researchPaper.upsert({
      where: { doi: paper.doi },
      update: {
        title: paper.title,
        category: paper.category,
        journal: paper.journal,
        year: paper.year,
        authors: paper.authors,
        abstract: paper.abstract,
        readTime: paper.readTime,
        impactFactor: paper.impactFactor,
        keyTakeaway: paper.keyTakeaway,
        downloadSize: paper.downloadSize,
        highlights: detail?.highlights || [],
        specs: detail?.specs ? JSON.parse(JSON.stringify(detail.specs)) : undefined,
        interactiveParams: detail?.interactiveParams ? JSON.parse(JSON.stringify(detail.interactiveParams)) : undefined,
        whitepaper: detail?.whitepaper ? JSON.parse(JSON.stringify(detail.whitepaper)) : undefined,
        labProtocol: detail?.labProtocol ? JSON.parse(JSON.stringify(detail.labProtocol)) : undefined,
      },
      create: {
        id: paper.id,
        title: paper.title,
        category: paper.category,
        journal: paper.journal,
        doi: paper.doi,
        year: paper.year,
        authors: paper.authors,
        abstract: paper.abstract,
        readTime: paper.readTime,
        impactFactor: paper.impactFactor,
        keyTakeaway: paper.keyTakeaway,
        downloadSize: paper.downloadSize,
        highlights: detail?.highlights || [
          "Empirical sub-angstrom crystallography convergence.",
          "High-throughput automated robotic assay validation.",
          "Zero-shot de novo affinity optimization.",
        ],
        specs: detail?.specs ? JSON.parse(JSON.stringify(detail.specs)) : [
          { label: "Accuracy", value: "98.7%", detail: "In vitro binding affinity match" },
          { label: "Throughput", value: "50K/hr", detail: "Parallel GPU tensor kernels" },
        ],
        interactiveParams: detail?.interactiveParams ? JSON.parse(JSON.stringify(detail.interactiveParams)) : {
          bindingAffinity: { min: 0.01, max: 10.0, default: 0.42, unit: "nM" },
          foldingRmsd: { min: 0.1, max: 2.0, default: 0.38, unit: "Å" },
          throughputSpeed: { min: 1000, max: 100000, default: 50000, unit: "mol/hr" },
          offTargetTox: { min: 0.1, max: 5.0, default: 0.8, unit: "%" },
        },
        whitepaper: detail?.whitepaper ? JSON.parse(JSON.stringify(detail.whitepaper)) : {
          doi: paper.doi,
          journal: paper.journal,
          publicationDate: `${paper.year}`,
          authors: [paper.authors],
          citations: 84,
          downloadUrl: "#",
          keyFindings: [paper.keyTakeaway],
        },
        labProtocol: detail?.labProtocol ? JSON.parse(JSON.stringify(detail.labProtocol)) : {
          assayType: "Surface Plasmon Resonance (SPR)",
          temperature: "25.0°C ± 0.1°C",
          ph: "7.40",
          roboticPlatform: "Tecan Fluent 1080",
          incubationTime: "45 Minutes",
        },
      },
    });
  }

  // Also seed standalone detail monographs (e.g. protein-engine, genomic-pipeline, etc.)
  for (const detail of Object.values(RESEARCH_DETAILS)) {
    const existing = await prisma.researchPaper.findUnique({
      where: { id: detail.id },
    });

    if (!existing) {
      const doiKey = detail.whitepaper.doi + (detail.id.startsWith("paper") ? "" : `-${detail.id}`);
      await prisma.researchPaper.create({
        data: {
          id: detail.id,
          title: detail.title,
          subtitle: detail.subtitle,
          category: detail.category,
          counter: detail.counter,
          journal: detail.whitepaper.journal,
          doi: doiKey,
          year: "2026",
          authors: detail.whitepaper.authors.join(", "),
          abstract: detail.abstract,
          readTime: "10 min read",
          impactFactor: "24.5",
          keyTakeaway: detail.whitepaper.keyFindings[0] || "Empirical validated breakthrough.",
          downloadSize: "4.8 MB PDF",
          highlights: detail.highlights,
          specs: JSON.parse(JSON.stringify(detail.specs)),
          interactiveParams: detail.interactiveParams ? JSON.parse(JSON.stringify(detail.interactiveParams)) : undefined,
          whitepaper: JSON.parse(JSON.stringify(detail.whitepaper)),
          labProtocol: detail.labProtocol ? JSON.parse(JSON.stringify(detail.labProtocol)) : undefined,
        },
      });
    }
  }
  console.log(`✅ Research monographs seeded successfully.`);

  // 3. Seed Platform Statistics
  console.log("📊 Seeding Platform Statistics...");
  for (let i = 0; i < STATS.length; i++) {
    const stat = STATS[i];
    const statId = `stat_${i + 1}`;
    await prisma.platformStat.upsert({
      where: { id: statId },
      update: {
        label: stat.label,
        targetNumber: stat.targetNumber,
        prefix: stat.prefix || null,
        suffix: stat.suffix,
        decimals: stat.decimals || 0,
        description: stat.description,
        order: i,
      },
      create: {
        id: statId,
        label: stat.label,
        targetNumber: stat.targetNumber,
        prefix: stat.prefix || null,
        suffix: stat.suffix,
        decimals: stat.decimals || 0,
        description: stat.description,
        order: i,
      },
    });
  }
  console.log(`✅ Platform stats seeded successfully.`);

  // 4. Seed Foundational Therapeutic Projects
  console.log("🧬 Seeding Foundational Projects & Sequences...");
  const project1 = await prisma.project.upsert({
    where: { code: "PRJ-ONC-884" },
    update: {},
    create: {
      id: "prj_1",
      name: "KRAS-G12D Allosteric Inhibitor",
      code: "PRJ-ONC-884",
      description: "Generative de novo peptide design targeting KRAS-G12D switch-II oncogenic binding pocket.",
      status: "ACTIVE",
      targetOrganism: "Homo sapiens",
      diseaseArea: "Pancreatic & Colorectal Oncology",
      tags: ["KRAS", "Diffusion-3D", "Peptide", "High-Affinity"],
      userId: defaultUser.id,
    },
  });

  const project2 = await prisma.project.upsert({
    where: { code: "PRJ-IMM-402" },
    update: {},
    create: {
      id: "prj_2",
      name: "HER2/neu Bispecific CAR-T Construct",
      code: "PRJ-IMM-402",
      description: "Multi-targeted chimeric antigen receptor construct with optimized scFv linkers.",
      status: "IN_SILICO_VALIDATION",
      targetOrganism: "Homo sapiens",
      diseaseArea: "Solid Tumor Immunotherapy",
      tags: ["CAR-T", "Bispecific", "scFv", "Immunology"],
      userId: defaultUser.id,
    },
  });

  const project3 = await prisma.project.upsert({
    where: { code: "PRJ-SYN-109" },
    update: {},
    create: {
      id: "prj_3",
      name: "CRISPR-Cas12a Multiplex Knockout",
      code: "PRJ-SYN-109",
      description: "Metabolic pathway engineering in Pichia pastoris for recombinant antibody hyper-expression.",
      status: "SYNTHESIS",
      targetOrganism: "Pichia pastoris",
      diseaseArea: "Industrial Biomanufacturing",
      tags: ["Cas12a", "Multiplex", "Metabolic Flux", "Recombinant"],
      userId: defaultUser.id,
    },
  });

  // 5. Seed Curated Lead Sequences
  await prisma.sequence.upsert({
    where: { accession: "CB-SEQ-8849" },
    update: {},
    create: {
      id: "seq_1",
      name: "KRAS-G12D Target Strand",
      accession: "CB-SEQ-8849",
      nucleotides: "ATGACTGAATATAAACTTGTGGTAGTTGGAGCTGGTGGCGTAGGCAAGAGTGCCTTGACGATACAGCTAATTCAGAATCATTTTGTGGACGAATATGATCCAACAATAGAGGATTCC",
      type: "DNA",
      length: 120,
      gcContent: 41.67,
      meltingTemp: 78.4,
      freeEnergy: -34.8,
      notes: "Exon 2 codon 12 G12D mutant sequence (GGT->GAT)",
      projectId: project1.id,
      userId: defaultUser.id,
    },
  });

  await prisma.sequence.upsert({
    where: { accession: "CB-SEQ-2022" },
    update: {},
    create: {
      id: "seq_2",
      name: "SpCas9 Guide Construct Alpha",
      accession: "CB-SEQ-2022",
      nucleotides: "GCTAGCTAGCTAGCTAATGCAGCTAGCTAGCTACGATCGTAGCTAGCTAGCTAGCTA",
      type: "CRISPR_GUIDE",
      length: 58,
      gcContent: 51.72,
      meltingTemp: 72.1,
      freeEnergy: -18.4,
      notes: "On-target efficiency score 89.2% via Rule Set 2",
      projectId: project3.id,
      userId: defaultUser.id,
    },
  });

  await prisma.sequence.upsert({
    where: { accession: "CB-SEQ-7701" },
    update: {},
    create: {
      id: "seq_3",
      name: "Synthetic Promoter SYN-770",
      accession: "CB-SEQ-7701",
      nucleotides: "ATGACCATGACGATCGTACGATCGTACGATCGATCGATCGGCTATACGCGATCGATCG",
      type: "PROMOTER",
      length: 58,
      gcContent: 50.0,
      meltingTemp: 71.8,
      freeEnergy: -17.2,
      notes: "High-expression inducible promoter construct",
      projectId: project3.id,
      userId: defaultUser.id,
    },
  });
  console.log(`✅ Projects and Sequences seeded successfully.`);

  // 6. Seed In Silico Experiments
  console.log("🔬 Seeding Simulation Experiments...");
  await prisma.experiment.upsert({
    where: { runId: "EXP-2026-904" },
    update: {},
    create: {
      id: "exp_1",
      name: "SantaLucia Nearest-Neighbor Duplex Melting",
      runId: "EXP-2026-904",
      type: "THERMODYNAMIC_MELTING",
      status: "COMPLETED",
      parameters: {
        monovalentSalt: "50mM",
        mgSalt: "1.5mM",
        oligoConc: "0.5uM",
      },
      results: { tm: 78.4, deltaG: -34.8, kd: 0.12, stabilityIndex: 94 },
      executionTimeMs: 140,
      projectId: project1.id,
      userId: defaultUser.id,
      startedAt: new Date(Date.now() - 86400000 * 3),
      completedAt: new Date(Date.now() - 86400000 * 3 + 140),
    },
  });

  await prisma.experiment.upsert({
    where: { runId: "EXP-2026-908" },
    update: {},
    create: {
      id: "exp_2",
      name: "SpCas9 On/Off-Target CFD Scan",
      runId: "EXP-2026-908",
      type: "CRISPR_KNOCKOUT_DESIGN",
      status: "COMPLETED",
      parameters: { pam: "NGG", minScore: 60, seedLength: 10 },
      results: { guidesFound: 6, topScore: 92, bestPam: "AGG" },
      executionTimeMs: 380,
      projectId: project3.id,
      userId: defaultUser.id,
      startedAt: new Date(Date.now() - 86400000 * 1),
      completedAt: new Date(Date.now() - 86400000 * 1 + 380),
    },
  });

  await prisma.experiment.upsert({
    where: { runId: "EXP-2026-912" },
    update: {},
    create: {
      id: "exp_3",
      name: "Needleman-Wunsch Global Homology Align",
      runId: "EXP-2026-912",
      type: "PAIRWISE_ALIGNMENT",
      status: "COMPLETED",
      parameters: { match: 2, mismatch: -1, gap: -2 },
      results: { identity: 94.2, similarity: 97.8, gaps: 2, score: 218 },
      executionTimeMs: 210,
      projectId: project2.id,
      userId: defaultUser.id,
      startedAt: new Date(Date.now() - 3600000 * 4),
      completedAt: new Date(Date.now() - 3600000 * 4 + 210),
    },
  });
  console.log(`✅ Simulation Experiments seeded successfully.`);

  // 7. Seed Bio-Compute Pipeline
  console.log("⚡ Seeding Pipelines...");
  const pipelineCount = await prisma.pipeline.count();
  if (pipelineCount === 0) {
    await prisma.pipeline.create({
      data: {
        id: "pip_1",
        name: "Automated Lead Target Screen",
        description: "Sequence Ingestion -> Quality Trim -> ORF Finder -> Thermodynamic Melting -> CRISPR Verification",
        nodes: [
          { id: "node-1", type: "sequenceInput", label: "FASTA Sequence Input", position: { x: 50, y: 150 }, status: "completed" },
          { id: "node-2", type: "gcFilter", label: "GC Content Filter (40-65%)", position: { x: 280, y: 150 }, status: "completed" },
          { id: "node-3", type: "thermoAnalysis", label: "SantaLucia NN Kinetics", position: { x: 520, y: 80 }, status: "completed" },
          { id: "node-4", type: "orfFinder", label: "6-Frame ORF Detection", position: { x: 520, y: 240 }, status: "completed" },
          { id: "node-5", type: "crisprScan", label: "SpCas9 Target Designer", position: { x: 760, y: 150 }, status: "completed" },
          { id: "node-6", type: "reportExport", label: "JSON/PDB Synthesis Report", position: { x: 1000, y: 150 }, status: "ready" },
        ],
        edges: [
          { id: "e1-2", source: "node-1", target: "node-2" },
          { id: "e2-3", source: "node-2", target: "node-3" },
          { id: "e2-4", source: "node-2", target: "node-4" },
          { id: "e3-5", source: "node-3", target: "node-5" },
          { id: "e4-5", source: "node-4", target: "node-5" },
          { id: "e5-6", source: "node-5", target: "node-6" },
        ],
        isTemplate: true,
        userId: defaultUser.id,
      },
    });
  }
  console.log(`✅ Bio-Compute Pipelines verified.`);

  // 8. Seed Activity Logs
  const actCount = await prisma.activityLog.count();
  if (actCount === 0) {
    await prisma.activityLog.createMany({
      data: [
        {
          action: "EXECUTED_EXPERIMENT",
          entityType: "Experiment",
          entityId: "exp_1",
          details: { name: "SantaLucia Nearest-Neighbor Duplex Melting", runId: "EXP-2026-904" },
          userId: defaultUser.id,
        },
        {
          action: "CREATED_SEQUENCE",
          entityType: "Sequence",
          entityId: "seq_1",
          details: { name: "KRAS-G12D Target Strand", accession: "CB-SEQ-8849" },
          userId: defaultUser.id,
        },
        {
          action: "RAN_CRISPR_DESIGN",
          entityType: "Experiment",
          entityId: "exp_2",
          details: { name: "SpCas9 On/Off-Target CFD Scan", guides: 6 },
          userId: defaultUser.id,
        },
      ],
    });
  }

  console.log("✨ Codex Bio Database migration & seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
