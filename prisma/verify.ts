import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_6dCIuMF1ASHt@ep-mute-wildflower-az8khpg5-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function verify() {
  const [users, papers, stats, projects, sequences, experiments, pipelines] = await Promise.all([
    prisma.user.count(),
    prisma.researchPaper.count(),
    prisma.platformStat.count(),
    prisma.project.count(),
    prisma.sequence.count(),
    prisma.experiment.count(),
    prisma.pipeline.count(),
  ]);

  console.log("================ DATABASE VERIFICATION ================");
  console.log(`Users:               ${users}`);
  console.log(`Research Papers:     ${papers}`);
  console.log(`Platform Stats:      ${stats}`);
  console.log(`Projects:            ${projects}`);
  console.log(`Sequences:           ${sequences}`);
  console.log(`Experiments:         ${experiments}`);
  console.log(`Pipelines:           ${pipelines}`);
  console.log("=======================================================");

  const samplePaper = await prisma.researchPaper.findFirst();
  console.log(`Sample Paper: "${samplePaper?.title}" (${samplePaper?.category})`);

  const sampleSeq = await prisma.sequence.findFirst();
  console.log(`Sample Sequence: "${sampleSeq?.name}" (${sampleSeq?.accession}, GC: ${sampleSeq?.gcContent}%, Tm: ${sampleSeq?.meltingTemp}°C)`);

  await pool.end();
}

verify().catch(console.error);
