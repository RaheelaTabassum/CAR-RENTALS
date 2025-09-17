import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma-client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * GET /api/v1/users
 * Fetch all users (excluding password)
 */
export async function GET() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email_id: true,
        name: true,
        role_id: true,
        is_active:true,
        createdAt: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/v1/users
 * Add a new user
 */
export async function POST(request) {
  try {
    const data = await request.json();

    // check if username already exists
    const exists = await prisma.users.findUnique({
      where: { username: data.username },
    });
    if (exists) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // create new user
    const newUser = await prisma.users.create({
      data: {
        name: data.name,
        username: data.username,
        email_id: data.email_id || null, // make it optional
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
    );
  }
}
