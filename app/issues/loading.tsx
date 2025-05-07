"use client";

import { Box, Flex, Table } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import Skeleton from "../_components/Skeleton";
import IssueTableControls from "./_components/IssueTableControls";
import copyText from "./copyText";

const LoadingIssuesPage = () => {
  const pathname = usePathname();

  const isNestedRoute = pathname.split("/").length > 2;

  if (isNestedRoute) return null;

  const issues = [1, 2, 3, 4, 5];

  return (
    <Flex direction="column" gap="3">
      <IssueTableControls />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              {copyText.issueTableColumnHeader_issue}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {copyText.issueTableColumnHeader_status}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {copyText.issueTableColumnHeader_createdAt}
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
    </Flex>
  );
};

export default LoadingIssuesPage;
