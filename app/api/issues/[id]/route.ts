import authOptions from "@/app/auth/authOptions";
import { updateIssueSchema } from "@/app/validationSchemas";
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
    return NextResponse.json({ error: ISSUE_NOT_FOUND }, { status: 404 });
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
  const validation = updateIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  if (body.assigneeUserID) {
    const user = await prisma.user.findUnique({
      where: { id: body.assigneeUserID },
    });

    if (!user) {
      return NextResponse.json({ error: USER_NOT_FOUND }, { status: 400 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: ISSUE_NOT_FOUND }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      assigneeUserID: body.assigneeUserID,
      description: body.description,
      title: body.title,
    },
  });

  return NextResponse.json(updatedIssue);
}

const ISSUE_NOT_FOUND = "ISSUE_NOT_FOUND";
const USER_NOT_FOUND = "USER_NOT_FOUND";
