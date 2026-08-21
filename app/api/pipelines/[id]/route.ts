import { NextResponse } from "next/server";
import { prisma, mockDb } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let pipeline = null;

    try {
      pipeline = await prisma.pipeline.findUnique({ where: { id } });
    } catch {
      pipeline = mockDb.pipelines.find((p) => p.id === id) || null;
    }

    if (!pipeline) {
      return NextResponse.json({ success: false, error: "Pipeline not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: pipeline });
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
    const { name, description, nodes, edges, isTemplate } = body;

    let updated = null;
    try {
      updated = await prisma.pipeline.update({
        where: { id },
        data: { name, description, nodes, edges, isTemplate },
      });
    } catch {
      const idx = mockDb.pipelines.findIndex((p) => p.id === id);
      if (idx !== -1) {
        mockDb.pipelines[idx] = {
          ...mockDb.pipelines[idx],
          ...(name && { name }),
          ...(description !== undefined && { description }),
          ...(nodes && { nodes }),
          ...(edges && { edges }),
          ...(isTemplate !== undefined && { isTemplate }),
          updatedAt: new Date().toISOString(),
        };
        updated = mockDb.pipelines[idx];
      }
    }

    if (!updated) {
      return NextResponse.json({ success: false, error: "Pipeline not found" }, { status: 404 });
    }

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
    try {
      await prisma.pipeline.delete({ where: { id } });
    } catch {
      mockDb.pipelines = mockDb.pipelines.filter((p) => p.id !== id);
    }
    return NextResponse.json({ success: true, message: "Pipeline removed" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
