import IssueStatusBadge from "@/app/_components/IssueStatusBadge";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({
  issue: { createdAt, description, status, title },
}: {
  issue: Issue;
}) => {
  return (
    <>
      <Heading>{title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={status} />
        <Text>{createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="5">
        <ReactMarkdown>{description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
