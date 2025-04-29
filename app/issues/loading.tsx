"use client";

import { Box, Table } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import Skeleton from "../_components/Skeleton";
import copyText from "./copyText";
import IssueTableControls from "./IssueTableControls";

const LoadingIssuesPage = () => {
  const pathname = usePathname();

  const isNestedRoute = pathname.split("/").length > 2;

  if (isNestedRoute) return null;

  const issues = [1, 2, 3, 4, 5];

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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <Box className="block md:hidden">
                  <Skeleton />
                </Box>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingIssuesPage;
