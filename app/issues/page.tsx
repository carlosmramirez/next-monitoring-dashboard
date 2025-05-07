import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Box, Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { FaArrowUp } from "react-icons/fa";
import IssueStatusBadge from "../_components/IssueStatusBadge";
import Link from "../_components/Link";
import Pagination from "../_components/Pagination";
import paths from "../paths";
import IssueTableControls from "./_components/IssueTableControls";
import copyText from "./copyText";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { orderBy: keyof Issue; page: string; status: Status };
}) => {
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

  const columns: { className: string; label: string; value: keyof Issue }[] = [
    {
      className: "",
      label: copyText.issueTableColumnHeader_issue,
      value: "title",
    },
    {
      className: "hidden md:table-cell",
      label: copyText.issueTableColumnHeader_status,
      value: "status",
    },
    {
      className: "header-cell hidden md:table-cell",
      label: copyText.issueTableColumnHeader_createdAt,
      value: "createdAt",
    },
    {
      className: "header-cell hidden md:table-cell",
      label: copyText.issueTableColumnHeader_updatedAt,
      value: "updatedAt",
    },
  ];

  return (
    <>
      <IssueTableControls />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell className={col.className} key={col.value}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: col.value },
                  }}
                >
                  {col.label}
                </NextLink>
                {col.value === searchParams.orderBy && (
                  <FaArrowUp className="inline ml-1" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex align="center" height="100%">
                  <Link href={`${paths.issues}/${issue.id}`}>
                    {issue.title.length > 50
                      ? issue.title.slice(0, 50) + "..."
                      : issue.title}
                  </Link>
                  <Box className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </Box>
                </Flex>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Flex align="center" height="100%">
                  <IssueStatusBadge status={issue.status} />
                </Flex>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Flex align="center" height="100%">
                  {issue.createdAt.toDateString()}
                </Flex>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Flex align="center" height="100%">
                  {issue.updatedAt.toDateString()}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </>
  );
};

const isValidOrder = (val: string): boolean => {
  return ["title", "status", "createdAt", "updatedAt"].includes(val);
};

const isValidStatus = (val: Status): boolean => {
  return Object.values(Status).includes(val);
};

export const dynamic = "force-dynamic";

export default IssuesPage;
