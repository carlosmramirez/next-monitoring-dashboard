import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Box, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { FaArrowUp } from "react-icons/fa";
import IssueStatusBadge from "../_components/IssueStatusBadge";
import Link from "../_components/Link";
import paths from "../paths";
import IssueTableControls from "./_components/IssueTableControls";
import copyText from "./copyText";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { orderBy: keyof Issue; status: Status };
}) => {
  //
  // Queries
  //

  const issues = await prisma.issue.findMany({
    ...(isValidStatus(searchParams.status)
      ? {
          where: {
            status: searchParams.status,
          },
        }
      : {}),
    ...(isValidOrder(searchParams.orderBy)
      ? {
          orderBy: {
            [searchParams.orderBy]: "asc",
          },
        }
      : {}),
  });

  //
  // Render
  //

  const columns: { className: string; label: string; value: keyof Issue }[] = [
    {
      className: "header-cell",
      label: copyText.issueTableColumnHeader_issue,
      value: "title",
    },
    {
      className: "header-cell hidden md:table-cell",
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
                <Link href={`${paths.issues}/${issue.id}`}>{issue.title}</Link>
                <Box className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </Box>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.updatedAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
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
