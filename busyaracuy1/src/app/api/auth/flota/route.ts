import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { idUnidad, marcaId, modeloId, vim, fecha, capacidad, combustible, transmision, statusId } = await req.json();

    if (!idUnidad || !marcaId || !modeloId || !vim || !fecha || !capacidad || !combustible || !transmision || !statusId) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const unidad = await prisma.unidad.create({
      data: {
        idUnidad: idUnidad,
        marcaId: Number(marcaId),
        modeloId: Number(modeloId),
        vim,
        fecha,
        capacidad,
        combustible,
        transmision,
        statusId: Number(statusId),
      },
    });

    return NextResponse.json(unidad, { status: 201 });
  } catch (error) {
    console.error("Error al registrar la unidad:", error);
    return NextResponse.json({ message: "Error al registrar la unidad" }, { status: 500 });
  }
}
