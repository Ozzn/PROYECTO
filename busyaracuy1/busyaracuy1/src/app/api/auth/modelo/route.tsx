import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Obtener todos los modelos
export async function GET() {
  try {
    const modelos = await prisma.modelo.findMany();
    return NextResponse.json(modelos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener modelos" }, { status: 500 });
  }
}

// Crear un nuevo modelo
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nuevoModelo = await prisma.modelo.create({
      data: body,
    });
    return NextResponse.json(nuevoModelo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al registrar el modelo" }, { status: 500 });
  }
}
