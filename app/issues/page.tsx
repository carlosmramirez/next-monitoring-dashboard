import { Button, Table } from "@radix-ui/themes";
import React from "react";
import copyText from "./copyText";
import Link from "next/link";
import paths from "../paths";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <>
      <div className="mb-5">
        <Button color="indigo">
          <Link href={paths.newIssue}>{copyText.buttonLabelNewIssue}</Link>
        </Button>
      </div>
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
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssuesPage;
