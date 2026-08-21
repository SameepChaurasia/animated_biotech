import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_6dCIuMF1ASHt@ep-mute-wildflower-az8khpg5-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
});
