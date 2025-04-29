import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";
import copyText from "../copyText";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { color: "green" | "red" | "violet"; label: string }
> = {
  [Status.CLOSED]: { color: "green", label: copyText.buttonLabelSubmit },
  [Status.IN_PROGRESS]: {
    color: "violet",
    label: copyText.issuesTableStatus_IN_PROGRESS,
  },
  [Status.OPEN]: { color: "red", label: copyText.issuesTableStatus_OPEN },
};
const IssueStatusBadge = (props: Props) => {
  return (
    <Badge color={statusMap[props.status].color} radius="medium">
      {statusMap[props.status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
