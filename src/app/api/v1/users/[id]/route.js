import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, email_id, role_id, is_active } = body;

    const updatedUser = await prisma.users.update({
      where: { id: String(id) },   // ✅ ensure string id
      data: { name, email_id, role_id, is_active },
    });

    return NextResponse.json(
      { message: "User updated", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /users error:", error);
    return NextResponse.json(
      { error: "Failed to update user", details: error.message },
      { status: 500 }
    );
  }
}
