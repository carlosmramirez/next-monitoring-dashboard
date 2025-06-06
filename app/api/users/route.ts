import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return NextResponse.json(users, { status: 200 });
}

export const dynamic = "force-dynamic";
