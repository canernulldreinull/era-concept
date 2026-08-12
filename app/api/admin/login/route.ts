import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "E-posta ve şifre zorunludur.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "E-posta veya şifre hatalı.",
        },
        {
          status: 401,
        }
      );
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordCorrect) {
      return NextResponse.json(
        {
          error: "E-posta veya şifre hatalı.",
        },
        {
          status: 401,
        }
      );
    }

    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Sunucu hatası oluştu.",
      },
      {
        status: 500,
      }
    );
  }
}