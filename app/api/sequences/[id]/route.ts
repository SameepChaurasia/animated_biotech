import { NextResponse } from "next/server";
import { prisma, mockDb } from "@/lib/prisma";
import { calculateThermodynamics } from "@/lib/bioinformatics/thermodynamics";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let sequence = null;

    try {
      sequence = await prisma.sequence.findUnique({
        where: { id },
        include: { project: true },
      });
    } catch {
      sequence = mockDb.sequences.find((s) => s.id === id) || null;
    }

    if (!sequence) {
      return NextResponse.json({ success: false, error: "Sequence not found" }, { status: 404 });
    }

    const metrics = calculateThermodynamics(sequence.nucleotides);
    return NextResponse.json({ success: true, data: sequence, metrics });
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
    const { name, nucleotides, type, projectId, notes } = body;

    let cleanSeq = nucleotides ? nucleotides.toUpperCase().replace(/[^ATCGU]/g, "") : undefined;
    let metrics = cleanSeq ? calculateThermodynamics(cleanSeq) : undefined;

    let updated = null;
    try {
      updated = await prisma.sequence.update({
        where: { id },
        data: {
          name,
          nucleotides: cleanSeq,
          type,
          projectId,
          notes,
          length: metrics?.length,
          gcContent: metrics?.gcContent,
          meltingTemp: metrics?.meltingTemp,
          freeEnergy: metrics?.freeEnergy,
        },
      });
    } catch {
      const idx = mockDb.sequences.findIndex((s) => s.id === id);
      if (idx !== -1) {
        mockDb.sequences[idx] = {
          ...mockDb.sequences[idx],
          ...(name && { name }),
          ...(cleanSeq && {
            nucleotides: cleanSeq,
            length: metrics?.length,
            gcContent: metrics?.gcContent,
            meltingTemp: metrics?.meltingTemp,
            freeEnergy: metrics?.freeEnergy,
          }),
          ...(type && { type }),
          ...(projectId !== undefined && { projectId }),
          ...(notes !== undefined && { notes }),
          updatedAt: new Date().toISOString(),
        };
        updated = mockDb.sequences[idx];
      }
    }

    if (!updated) {
      return NextResponse.json({ success: false, error: "Sequence not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated, metrics });
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
      await prisma.sequence.delete({ where: { id } });
    } catch {
      mockDb.sequences = mockDb.sequences.filter((s) => s.id !== id);
    }
    return NextResponse.json({ success: true, message: "Sequence removed successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
