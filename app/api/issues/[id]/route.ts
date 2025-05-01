import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  const deletedIssue = await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({ deletedIssueID: deletedIssue.id });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      description: body.description,
      title: body.title,
    },
  });

  return NextResponse.json(updatedIssue);
}
