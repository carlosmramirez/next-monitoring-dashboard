import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueSummary from "./IssueSummary";

export default async function Home() {
  const closed = await prisma.issue.count({ where: { status: Status.CLOSED } });
  const inProgress = await prisma.issue.count({
    where: { status: Status.IN_PROGRESS },
  });
  const open = await prisma.issue.count({ where: { status: Status.OPEN } });

  return (
    <>
      <IssueSummary closed={closed} inProgress={inProgress} open={open} />
    </>
  );
}
