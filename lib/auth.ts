import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET bulunamadı.");
}

const secret = new TextEncoder().encode(jwtSecret);

export async function createSession(payload: {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
}) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const cookieStore = await cookies();

  cookieStore.set("store_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("store_session")?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as "USER" | "ADMIN",
    };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("store_session");
}