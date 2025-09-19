import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST: Add new model
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, brand, image, status } = body;

    const newModel = await prisma.Models.create({
      data: { name, brand, image, status },
    });

    return NextResponse.json(newModel, { status: 201 });
  } catch (error) {
    console.error("Add model error:", error);
    return NextResponse.json(
      { error: "Failed to add model", details: error.message },
      { status: 500 }
    );
  }
}

// GET: Fetch all models
export async function GET() {
  try {
    const Models = await prisma.Models.findMany();
    return NextResponse.json(Models, { status: 200 });
  } catch (error) {
    console.error("Fetch models error:", error);
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500 }
    );
  }
}
