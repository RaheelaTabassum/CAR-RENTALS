import { PrismaClient } from "../../../../../generated/prisma-client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

// POST /api/v1/auth - login
export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid username or password" }), { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return new Response(JSON.stringify({ error: "Invalid username or password" }), { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role_id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return new Response(JSON.stringify({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role_id,
      },
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
