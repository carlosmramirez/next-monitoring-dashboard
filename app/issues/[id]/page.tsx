import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./_components/DeleteIssueButton";
import EditIssueButton from "./_components/EditIssueButton";
import IssueDetails from "./_components/IssueDetails";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  if (typeof params.id !== "string") notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

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
            <EditIssueButton issueID={issue.id} />
            <DeleteIssueButton issueID={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
