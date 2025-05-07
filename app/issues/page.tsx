import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "../_components/Pagination";
import IssueTable, { columnNames, IssuesQuery } from "./_components/IssueTable";
import IssueTableControls from "./_components/IssueTableControls";

const IssuesPage = async ({ searchParams }: { searchParams: IssuesQuery }) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  //
  // Queries
  //

  const statusMatcher = {
    where: {
      status: isValidStatus(searchParams.status)
        ? searchParams.status
        : undefined,
    },
  };

  const issues = await prisma.issue.findMany({
    ...statusMatcher,
    ...(isValidOrder(searchParams.orderBy)
      ? {
          orderBy: {
            [searchParams.orderBy]: "asc",
          },
        }
      : {}),
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count(statusMatcher);

  //
  // Render
  //

  return (
    <Flex direction="column" gap="3">
      <IssueTableControls />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

const isValidOrder = (val: keyof Issue): boolean => {
  return columnNames.includes(val);
};

const isValidStatus = (val: Status): boolean => {
  return Object.values(Status).includes(val);
};

export const dynamic = "force-dynamic";

export default IssuesPage;
