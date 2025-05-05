import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  // TODO: Consider passing userID on DELETE/PATCH/POST requests and checking if user exists.
  // Would also need to generate an access token for this approach.
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      description: body.description,
      title: body.title,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
