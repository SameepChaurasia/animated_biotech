import { NextResponse } from "next/server";
import { prisma, mockDb } from "@/lib/prisma";
import { publishBiotechEvent, KAFKA_TOPICS } from "@/lib/kafka";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let pipelines = [];
    try {
      pipelines = await prisma.pipeline.findMany({
        orderBy: { updatedAt: "desc" },
      });
    } catch {
      pipelines = mockDb.pipelines;
    }

    return NextResponse.json({ success: true, count: pipelines.length, data: pipelines });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, nodes = [], edges = [], isTemplate = false } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: "Pipeline name is required" }, { status: 400 });
    }

    let pipeline;
    try {
      pipeline = await prisma.pipeline.create({
        data: {
          name,
          description,
          nodes,
          edges,
          isTemplate,
          userId: "user_default",
        },
      });
    } catch {
      pipeline = {
        id: `pip_${Date.now()}`,
        name,
        description,
        nodes,
        edges,
        isTemplate,
        userId: "user_default",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockDb.pipelines.unshift(pipeline);
    }

    await publishBiotechEvent(KAFKA_TOPICS.PIPELINE_EXECUTION_REQUESTED, {
      pipelineId: pipeline.id,
      nodeCount: nodes.length,
    });

    return NextResponse.json({ success: true, data: pipeline }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
