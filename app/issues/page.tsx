import prisma from "@/prisma/client";
import { Box, Table } from "@radix-ui/themes";
import IssueStatusBadge from "../_components/IssueStatusBadge";
import Link from "../_components/Link";
import paths from "../paths";
import copyText from "./copyText";
import IssueTableControls from "./IssueTableControls";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <>
      <IssueTableControls />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              {copyText.issuesTableColumnHeader_issue}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {copyText.issuesTableColumnHeader_status}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {copyText.issuesTableColumnHeader_created}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {copyText.issuesTableColumnHeader_updatedAt}
            </Table.ColumnHeaderCell>
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

export const dynamic = "force-dynamic";

export default IssuesPage;
