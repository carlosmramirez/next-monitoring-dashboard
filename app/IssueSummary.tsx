import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "./_components/Link";
import copyText from "./copyText";
import paths from "./paths";

type CardOptions = { label: string; status: Status; value: number };

interface Props {
  closed: number;
  inProgress: number;
  open: number;
}

const IssueSummary = ({ closed, inProgress, open }: Props) => {
  const cardOptions: CardOptions[] = [
    {
      label: copyText.issueStatusBadge_CLOSED,
      status: Status.CLOSED,
      value: closed,
    },
    {
      label: copyText.issueStatusBadge_IN_PROGRESS,
      status: Status.IN_PROGRESS,
      value: inProgress,
    },
    { label: copyText.issueStatus_OPEN, status: Status.OPEN, value: open },
  ];

  return (
    <Flex gap="3">
      {cardOptions.map((card) => (
        <Card className="w-36" key={card.label}>
          <Flex direction="column" gap="1">
            <Link href={`${paths.issues}?status=${card.status}`}>
              {card.label}
            </Link>
            <Text className="font-bold" size="4">
              {card.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
