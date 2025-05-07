import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueMeters from "./IssueMeters";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const [closed, inProgress, open] = await prisma.$transaction([
    prisma.issue.count({ where: { status: Status.CLOSED } }),
    prisma.issue.count({
      where: { status: Status.IN_PROGRESS },
    }),
    prisma.issue.count({ where: { status: Status.OPEN } }),
  ]);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="3">
      <Flex direction="column" gap="3">
        <IssueMeters closed={closed} inProgress={inProgress} open={open} />
        <IssueChart closed={closed} inProgress={inProgress} open={open} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Monitoring Dashboard - Home",
  description:
    "View the quantity of Open, In Progress, and Closed issues that were reported to the system. A user can view the most recent issues as well as drill down into a certain issue or status to further investigate.",
};
