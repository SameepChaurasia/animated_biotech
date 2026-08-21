import { NextResponse } from "next/server";
import { prisma, mockDb } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let project = null;

    try {
      project = await prisma.project.findUnique({
        where: { id },
        include: {
          sequences: true,
          experiments: true,
        },
      });
    } catch {
      const p = mockDb.projects.find((item) => item.id === id);
      if (p) {
        project = {
          ...p,
          sequences: mockDb.sequences.filter((s) => s.projectId === id),
          experiments: mockDb.experiments.filter((e) => e.projectId === id),
        };
      }
    }

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project });
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
    const { name, description, status, targetOrganism, diseaseArea, tags } = body;

    let updated = null;
    try {
      updated = await prisma.project.update({
        where: { id },
        data: {
          name,
          description,
          status,
          targetOrganism,
          diseaseArea,
          tags,
        },
      });
    } catch {
      const idx = mockDb.projects.findIndex((p) => p.id === id);
      if (idx !== -1) {
        mockDb.projects[idx] = {
          ...mockDb.projects[idx],
          ...(name && { name }),
          ...(description !== undefined && { description }),
          ...(status && { status }),
          ...(targetOrganism && { targetOrganism }),
          ...(diseaseArea && { diseaseArea }),
          ...(tags && { tags }),
          updatedAt: new Date().toISOString(),
        };
        updated = mockDb.projects[idx];
      }
    }

    if (!updated) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
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
      await prisma.project.delete({ where: { id } });
    } catch {
      mockDb.projects = mockDb.projects.filter((p) => p.id !== id);
    }
    return NextResponse.json({ success: true, message: "Project removed successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
