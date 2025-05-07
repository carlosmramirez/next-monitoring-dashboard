import { Status } from "@prisma/client";
import { Badge, Flex } from "@radix-ui/themes";
import copyText from "../copyText";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { color: "green" | "red" | "violet"; label: string }
> = {
  [Status.CLOSED]: { color: "green", label: copyText.issueStatus_CLOSED },
  [Status.IN_PROGRESS]: {
    color: "violet",
    label: copyText.issueStatus_IN_PROGRESS,
  },
  [Status.OPEN]: { color: "red", label: copyText.issueStatus_OPEN },
};

const IssueStatusBadge = (props: Props) => {
  return (
    <Badge
      className="justify-center w-24"
      color={statusMap[props.status].color}
      radius="medium"
    >
      <Flex justify="center">{statusMap[props.status].label}</Flex>
    </Badge>
  );
};

export default IssueStatusBadge;
