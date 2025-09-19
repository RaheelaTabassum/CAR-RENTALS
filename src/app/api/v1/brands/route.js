// src/app/api/v1/brands/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all brands
export async function GET() {
  try {
    const brands = await prisma.brands.findMany({
      select: { id: true, name: true, is_active: true, createdAt: true },
    });
    return NextResponse.json(brands);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch brands" },
      { status: 500 }
    );
  }
}

// POST new brand
export async function POST(req) {
  try {
    const data = await req.json();

    // Convert string boolean to actual boolean
    const isActive =
      typeof data.is_active === "string"
        ? data.is_active.toLowerCase() === "true"
        : data.is_active ?? true;

    // Check if brand exists
    const exists = await prisma.brands.findUnique({ where: { name: data.name } });
    if (exists) return NextResponse.json({ error: "Brand already exists" }, { status: 400 });

    const newBrand = await prisma.brands.create({
      data: { name: data.name, is_active: isActive },
      select: { id: true, name: true, is_active: true, createdAt: true },
    });

    return NextResponse.json(newBrand, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create brand" },
      { status: 400 }
    );
  }
}
