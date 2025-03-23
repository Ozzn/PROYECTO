import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ajusta si la importación es diferente

export async function POST(req: Request) {
  try {
    const { nombre } = await req.json();

    if (!nombre) {
      return NextResponse.json({ message: "El nombre es requerido" }, { status: 400 });
    }

    const nuevaMarca = await prisma.marca.create({
      data: { nombre },
    });

    return NextResponse.json(nuevaMarca, { status: 201 });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
