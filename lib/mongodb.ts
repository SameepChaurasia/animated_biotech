import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/codex_bio";
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// In-memory document store fallback for chat logs and unstructured raw JSON logs
class InMemoryMongoStore {
  private collections: Map<string, any[]> = new Map();

  constructor() {
    this.collections.set("chat_sessions", [
      {
        id: "chat_demo_1",
        userId: "user_default",
        title: "KRAS G12D Binding Affinity Analysis",
        messages: [
          {
            role: "user",
            content: "What is the predicted melting temperature and binding affinity for the KRAS G12D peptide mutant?",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            role: "assistant",
            content: "For the KRAS G12D switch-II binding target (accession CB-SEQ-8849), the calculated melting temperature $T_m$ is **78.4°C** with a free energy $\\Delta G^{\\circ}_{37} = -34.8\\text{ kcal/mol}$. This indicates a high-affinity duplex with a sub-nanomolar dissociation constant $K_d \\approx 0.12\\text{ nM}$.",
            timestamp: new Date(Date.now() - 3550000).toISOString(),
          },
        ],
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ]);
    this.collections.set("experiment_logs", []);
  }

  getCollection(name: string) {
    if (!this.collections.has(name)) {
      this.collections.set(name, []);
    }
    const docs = this.collections.get(name)!;

    return {
      find: (query: any = {}) => ({
        toArray: async () => docs,
        sort: () => ({ toArray: async () => docs }),
      }),
      findOne: async (query: any) => docs.find((d) => d.id === query.id || d._id === query._id) || null,
      insertOne: async (doc: any) => {
        const newDoc = { ...doc, _id: doc._id || `doc_${Date.now()}` };
        docs.push(newDoc);
        return { insertedId: newDoc._id };
      },
      updateOne: async (query: any, update: any) => {
        const idx = docs.findIndex((d) => d.id === query.id || d._id === query._id);
        if (idx !== -1) {
          docs[idx] = { ...docs[idx], ...(update.$set || update) };
        }
        return { modifiedCount: idx !== -1 ? 1 : 0 };
      },
    };
  }
}

export const inMemoryMongo = new InMemoryMongoStore();

export async function getMongoDb(): Promise<Db | null> {
  if (!process.env.MONGODB_URI) {
    return null;
  }

  try {
    if (!client) {
      client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
    const connectedClient = await clientPromise!;
    return connectedClient.db("codex_bio");
  } catch (error) {
    console.warn("MongoDB connection failed, using in-memory store:", error);
    return null;
  }
}
