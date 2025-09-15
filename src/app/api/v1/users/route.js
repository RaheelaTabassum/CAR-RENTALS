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
        name: true,
        username: true,
        role_id: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * POST /api/v1/users
 * Create a new user
 */
export async function POST(request) {
  try {
    const data = await request.json();

    const exists = await prisma.users.findUnique({
      where: { username: data.username },
    });
    if (exists) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.users.create({
      data: {
        name: data.name,
        username: data.username,
        password: hashedPassword,
        role_id: data.role_id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        role_id: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

/**
 * PUT /api/v1/users
 * Update user details
 */
export async function PUT(request) {
  try {
    const { id, password, ...rest } = await request.json();
    let updateData = { ...rest };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.users.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        username: true,
        role_id: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

/**
 * DELETE /api/v1/users
 * Delete a user
 */
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.users.delete({ where: { id } });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
