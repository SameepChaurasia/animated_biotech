import { NextResponse } from "next/server";
import { prisma, mockDb } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let projects = [];
    try {
      projects = await prisma.project.findMany({
        include: {
          sequences: true,
          experiments: true,
        },
        orderBy: { updatedAt: "desc" },
      });
    } catch {
      projects = mockDb.projects.map((p) => ({
        ...p,
        sequences: mockDb.sequences.filter((s) => s.projectId === p.id),
        experiments: mockDb.experiments.filter((e) => e.projectId === p.id),
      }));
    }

    return NextResponse.json({ success: true, count: projects.length, data: projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, targetOrganism, diseaseArea, tags = [] } = body;

    if (!name || name.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Project name is required" }, { status: 400 });
    }

    const code = `PRJ-${(diseaseArea || "BIO").substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    let newProject;
    try {
      newProject = await prisma.project.create({
        data: {
          name,
          code,
          description,
          targetOrganism: targetOrganism || "Homo sapiens",
          diseaseArea: diseaseArea || "Oncology",
          tags,
          userId: "user_default",
        },
      });
    } catch {
      newProject = {
        id: `prj_${Date.now()}`,
        name,
        code,
        description,
        status: "ACTIVE",
        targetOrganism: targetOrganism || "Homo sapiens",
        diseaseArea: diseaseArea || "Oncology",
        tags,
        userId: "user_default",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockDb.projects.unshift(newProject);
      mockDb.activities.unshift({
        id: `act_${Date.now()}`,
        action: "CREATED_PROJECT",
        entityType: "Project",
        entityId: newProject.id,
        details: { name, code },
        userId: "user_default",
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
