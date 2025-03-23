import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { nombre } = await req.json();

    if (!nombre) {
      return NextResponse.json({ message: "El nombre es obligatorio" }, { status: 400 });
    }

    const modelo = await prisma.modelo.create({
      data: { nombre },
    });

    return NextResponse.json(modelo, { status: 201 });
  } catch (error) {
    console.error("Error al registrar el modelo:", error);
    return NextResponse.json({ message: "Error al registrar el modelo" }, { status: 500 });
  }
}
