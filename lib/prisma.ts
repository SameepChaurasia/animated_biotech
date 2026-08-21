import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_6dCIuMF1ASHt@ep-mute-wildflower-az8khpg5-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

let poolInstance: Pool | null = null;

function getPool(): Pool {
  if (!poolInstance) {
    poolInstance = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
    });
  }
  return poolInstance;
}

function createPrismaClient(): PrismaClient {
  const pool = getPool();
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

// Global singleton pattern
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  (() => {
    try {
      const client = createPrismaClient();
      if (process.env.NODE_ENV !== "production") {
        globalForPrisma.prisma = client;
      }
      return client;
    } catch (e) {
      console.warn("Prisma instantiation error, fallback initialized:", e);
      return new PrismaClient();
    }
  })();

/**
 * In-memory state store fallback for seamless local development
 * when a live PostgreSQL database is not connected.
 */
export interface MockStore {
  projects: any[];
  sequences: any[];
  experiments: any[];
  pipelines: any[];
  activities: any[];
}

export const mockDb: MockStore = {
  projects: [
    {
      id: "prj_1",
      name: "KRAS-G12D Allosteric Inhibitor",
      code: "PRJ-ONC-884",
      description:
        "Generative de novo peptide design targeting KRAS-G12D switch-II oncogenic binding pocket.",
      status: "ACTIVE",
      targetOrganism: "Homo sapiens",
      diseaseArea: "Pancreatic & Colorectal Oncology",
      tags: ["KRAS", "Diffusion-3D", "Peptide", "High-Affinity"],
      userId: "user_default",
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prj_2",
      name: "HER2/neu Bispecific CAR-T Construct",
      code: "PRJ-IMM-402",
      description:
        "Multi-targeted chimeric antigen receptor construct with optimized scFv linkers.",
      status: "IN_SILICO_VALIDATION",
      targetOrganism: "Homo sapiens",
      diseaseArea: "Solid Tumor Immunotherapy",
      tags: ["CAR-T", "Bispecific", "scFv", "Immunology"],
      userId: "user_default",
      createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prj_3",
      name: "CRISPR-Cas12a Multiplex Knockout",
      code: "PRJ-SYN-109",
      description:
        "Metabolic pathway engineering in Pichia pastoris for recombinant antibody hyper-expression.",
      status: "SYNTHESIS",
      targetOrganism: "Pichia pastoris",
      diseaseArea: "Industrial Biomanufacturing",
      tags: ["Cas12a", "Multiplex", "Metabolic Flux", "Recombinant"],
      userId: "user_default",
      createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  sequences: [
    {
      id: "seq_1",
      name: "KRAS-G12D Target Strand",
      accession: "CB-SEQ-8849",
      nucleotides:
        "ATGACTGAATATAAACTTGTGGTAGTTGGAGCTGGTGGCGTAGGCAAGAGTGCCTTGACGATACAGCTAATTCAGAATCATTTTGTGGACGAATATGATCCAACAATAGAGGATTCC",
      type: "DNA",
      length: 120,
      gcContent: 41.67,
      meltingTemp: 78.4,
      freeEnergy: -34.8,
      notes: "Exon 2 codon 12 G12D mutant sequence (GGT->GAT)",
      projectId: "prj_1",
      userId: "user_default",
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
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
      projectId: "prj_3",
      userId: "user_default",
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "seq_3",
      name: "Synthetic Promoter SYN-770",
      accession: "CB-SEQ-7701",
      nucleotides:
        "ATGACCATGACGATCGTACGATCGTACGATCGATCGATCGGCTATACGCGATCGATCG",
      type: "PROMOTER",
      length: 58,
      gcContent: 50.0,
      meltingTemp: 71.8,
      freeEnergy: -17.2,
      notes: "High-expression inducible promoter construct",
      projectId: "prj_3",
      userId: "user_default",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  experiments: [
    {
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
      projectId: "prj_1",
      userId: "user_default",
      startedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      completedAt: new Date(Date.now() - 86400000 * 3 + 140).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: "exp_2",
      name: "SpCas9 On/Off-Target CFD Scan",
      runId: "EXP-2026-908",
      type: "CRISPR_KNOCKOUT_DESIGN",
      status: "COMPLETED",
      parameters: { pam: "NGG", minScore: 60, seedLength: 10 },
      results: { guidesFound: 6, topScore: 92, bestPam: "AGG" },
      executionTimeMs: 380,
      projectId: "prj_3",
      userId: "user_default",
      startedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      completedAt: new Date(Date.now() - 86400000 * 1 + 380).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
    {
      id: "exp_3",
      name: "Needleman-Wunsch Global Homology Align",
      runId: "EXP-2026-912",
      type: "PAIRWISE_ALIGNMENT",
      status: "COMPLETED",
      parameters: { match: 2, mismatch: -1, gap: -2 },
      results: { identity: 94.2, similarity: 97.8, gaps: 2, score: 218 },
      executionTimeMs: 210,
      projectId: "prj_2",
      userId: "user_default",
      startedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      completedAt: new Date(Date.now() - 3600000 * 4 + 210).toISOString(),
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
  ],
  pipelines: [
    {
      id: "pip_1",
      name: "Automated Lead Target Screen",
      description:
        "Sequence Ingestion -> Quality Trim -> ORF Finder -> Thermodynamic Melting -> CRISPR Verification",
      nodes: [
        {
          id: "node-1",
          type: "sequenceInput",
          label: "FASTA Sequence Input",
          position: { x: 50, y: 150 },
          status: "completed",
        },
        {
          id: "node-2",
          type: "gcFilter",
          label: "GC Content Filter (40-65%)",
          position: { x: 280, y: 150 },
          status: "completed",
        },
        {
          id: "node-3",
          type: "thermoAnalysis",
          label: "SantaLucia NN Kinetics",
          position: { x: 520, y: 80 },
          status: "completed",
        },
        {
          id: "node-4",
          type: "orfFinder",
          label: "6-Frame ORF Detection",
          position: { x: 520, y: 240 },
          status: "completed",
        },
        {
          id: "node-5",
          type: "crisprScan",
          label: "SpCas9 Target Designer",
          position: { x: 760, y: 150 },
          status: "completed",
        },
        {
          id: "node-6",
          type: "reportExport",
          label: "JSON/PDB Synthesis Report",
          position: { x: 1000, y: 150 },
          status: "ready",
        },
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
      userId: "user_default",
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  activities: [
    {
      id: "act_1",
      action: "EXECUTED_EXPERIMENT",
      entityType: "Experiment",
      entityId: "exp_1",
      details: {
        name: "SantaLucia Nearest-Neighbor Duplex Melting",
        runId: "EXP-2026-904",
      },
      userId: "user_default",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: "act_2",
      action: "CREATED_SEQUENCE",
      entityType: "Sequence",
      entityId: "seq_1",
      details: { name: "KRAS-G12D Target Strand", accession: "CB-SEQ-8849" },
      userId: "user_default",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: "act_3",
      action: "RAN_CRISPR_DESIGN",
      entityType: "Experiment",
      entityId: "exp_2",
      details: { name: "SpCas9 On/Off-Target CFD Scan", guides: 6 },
      userId: "user_default",
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
  ],
};
