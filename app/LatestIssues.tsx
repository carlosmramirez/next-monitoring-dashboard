import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import IssueStatusBadge from "./_components/IssueStatusBadge";
import Link from "./_components/Link";
import copyText from "./copyText";
import paths from "./paths";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    include: { assigneeUser: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <Card>
      <Heading mb="2" size="4">
        {copyText.latestIssuesPageHeading}
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex align="center" justify="between">
                  <Flex direction="column" gap="2">
                    <Link href={`${paths.issues}/${issue.id}`}>
                      {issue.title.length > 75
                        ? issue.title.slice(0, 75) + "..."
                        : issue.title}
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assigneeUser && (
                    <Avatar
                      fallback="?"
                      radius="full"
                      size="2"
                      src={issue.assigneeUser.image ?? undefined}
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
