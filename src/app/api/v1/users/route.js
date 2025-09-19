// src/app/api/v1/users/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET all users
export async function GET() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email_id: true,
        name: true,
        role_id: true,
        is_active: true,
        createdAt: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST new user
export async function POST(req) {
  try {
    const data = await req.json();

    // Check if username already exists
    const exists = await prisma.users.findUnique({
      where: { username: data.username },
    });
    if (exists)
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const newUser = await prisma.users.create({
      data: {
        name: data.name,
        username: data.username,
        email_id: data.email_id || null,
        password: hashedPassword,
        role_id: data.role_id || "CUSTOMER",
      },
      select: {
        id: true,
        name: true,
        username: true,
        email_id: true,
        role_id: true,
        createdAt: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 400 }
    );3
    3/+-[]
  }
}
