import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./_components/AssigneeSelect";
import DeleteIssueButton from "./_components/DeleteIssueButton";
import EditIssueButton from "./_components/EditIssueButton";
import IssueDetails from "./_components/IssueDetails";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueID: number) => {
  return prisma.issue.findUnique({ where: { id: issueID } });
});

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  if (typeof params.id !== "string") notFound();

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="3">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueID={issue.id} />
            <DeleteIssueButton issueID={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: `Monitoring Dashboard - ${issue?.title}`,
    description: `Issue Details: ${issue?.description}`,
  };
}

export default IssueDetailPage;
