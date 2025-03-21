import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Obtener todas las unidades con relaciones
export async function GET() {
  try {
    const unidades = await prisma.unidad.findMany({
      include: {
        marca: true,
        modelo: true,
        status: true,
      },
    });
    return NextResponse.json(unidades, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener unidades" }, { status: 500 });
  }
}

// Crear una nueva unidad
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nuevaUnidad = await prisma.unidad.create({
      data: {
        idUnidad: body.idUnidad,
        marcaId: parseInt(body.marcaId),
        modeloId: parseInt(body.modeloId),
        transmision: body.transmision,
        vim: body.vim,
        fecha: body.fecha,
        capacidad: body.capacidad,
        combustible: body.combustible,
        statusId: parseInt(body.statusId),
      },
    });
    return NextResponse.json(nuevaUnidad, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al registrar la unidad" }, { status: 500 });
  }
}
