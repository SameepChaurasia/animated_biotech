import { Kafka, Producer, Consumer } from "kafkajs";
import { EventEmitter } from "events";

const KAFKA_BROKERS = (process.env.KAFKA_BROKERS || "localhost:9092").split(",");
const CLIENT_ID = "codex-bio-web";

let kafkaClient: Kafka | null = null;
let producer: Producer | null = null;

// Local In-Memory Event Bus Fallback
class LocalEventBus extends EventEmitter {
  async publish(topic: string, message: any) {
    console.log(`[EventBus::${topic}]`, message);
    this.emit(topic, message);
    return true;
  }
}

export const localEventBus = new LocalEventBus();

export const KAFKA_TOPICS = {
  SEQUENCE_ANALYSIS_REQUESTED: "sequence.analysis.requested",
  SEQUENCE_ANALYSIS_COMPLETED: "sequence.analysis.completed",
  PIPELINE_EXECUTION_REQUESTED: "pipeline.execution.requested",
  PIPELINE_STEP_COMPLETED: "pipeline.step.completed",
  EXPERIMENT_STATUS_UPDATED: "experiment.status.updated",
  AI_QUERY_LOGGED: "ai.query.logged",
};

export async function getKafkaProducer(): Promise<Producer | null> {
  if (!process.env.KAFKA_BROKERS) {
    return null;
  }

  if (producer) return producer;

  try {
    if (!kafkaClient) {
      kafkaClient = new Kafka({
        clientId: CLIENT_ID,
        brokers: KAFKA_BROKERS,
      });
    }

    producer = kafkaClient.producer();
    await producer.connect();
    return producer;
  } catch (error) {
    console.warn("Kafka broker unreachable, falling back to in-memory EventBus", error);
    return null;
  }
}

export async function publishBiotechEvent(topic: string, payload: Record<string, any>) {
  const messageData = {
    ...payload,
    timestamp: new Date().toISOString(),
    eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
  };

  const prod = await getKafkaProducer();
  if (prod) {
    try {
      await prod.send({
        topic,
        messages: [{ value: JSON.stringify(messageData) }],
      });
      return { success: true, mode: "kafka", eventId: messageData.eventId };
    } catch (e) {
      console.error("Failed to send Kafka message, publishing via LocalEventBus", e);
    }
  }

  // Fallback to local EventEmitter
  await localEventBus.publish(topic, messageData);
  return { success: true, mode: "event-bus", eventId: messageData.eventId };
}
