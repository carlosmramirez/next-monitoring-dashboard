import IssueStatusBadge from "@/app/_components/IssueStatusBadge";
import paths from "@/app/paths";
import { Issue, Status } from "@prisma/client";
import { Box, Flex, Link, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { FaArrowUp } from "react-icons/fa";
import copyText from "../copyText";

export interface IssuesQuery {
  orderBy: keyof Issue;
  page: string;
  status: Status;
}

interface Props {
  searchParams: IssuesQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
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
  );
};

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

export const columnNames = columns.map((col) => col.value);

export default IssueTable;
