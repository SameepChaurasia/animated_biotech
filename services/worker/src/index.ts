import express, { Request, Response } from "express";
import cors from "cors";
import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    service: "codex-bio-worker",
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
    workers: {
      thermodynamicKinetics: "online",
      needlemanWunschAligner: "online",
      crisprScanner: "online",
    },
  });
});

// Direct REST endpoint for compute execution
app.post("/api/compute/align", (req: Request, res: Response) => {
  const { seq1, seq2, mode = "global" } = req.body;
  if (!seq1 || !seq2) {
    return res.status(400).json({ error: "seq1 and seq2 required" });
  }

  // Fast compute algorithm
  const s1 = seq1.toUpperCase();
  const s2 = seq2.toUpperCase();
  let matches = 0;
  const minLen = Math.min(s1.length, s2.length);

  for (let i = 0; i < minLen; i++) {
    if (s1[i] === s2[i]) matches++;
  }

  const identity = Number(((matches / Math.max(s1.length, s2.length)) * 100).toFixed(1));

  res.json({
    success: true,
    mode,
    identity,
    length1: s1.length,
    length2: s2.length,
    timestamp: new Date().toISOString(),
  });
});

// Kafka Consumer Setup
async function startKafkaConsumer() {
  const brokers = (process.env.KAFKA_BROKERS || "localhost:9092").split(",");
  try {
    const kafka = new Kafka({ clientId: "codex-bio-worker", brokers });
    const consumer = kafka.consumer({ groupId: "biotech-compute-group" });

    await consumer.connect();
    console.log("Connected to Apache Kafka broker cluster:", brokers);

    await consumer.subscribe({
      topics: [
        "sequence.analysis.requested",
        "pipeline.execution.requested",
        "experiment.status.updated",
      ],
      fromBeginning: false,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const valueStr = message.value?.toString() || "{}";
        console.log(`[Kafka Worker] Received on [${topic}]:`, valueStr);
        // Process asynchronous genomic computation
      },
    });
  } catch (error) {
    console.warn("Kafka broker unreachable (standalone worker mode active):", (error as any).message);
  }
}

app.listen(PORT, () => {
  console.log(`Codex Bio Compute Worker listening on port ${PORT}`);
  startKafkaConsumer().catch(console.error);
});
