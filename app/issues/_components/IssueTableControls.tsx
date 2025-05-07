import paths from "@/app/paths";
import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import copyText from "../copyText";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueTableControls = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Button color="indigo">
        <Link href={paths.newIssue}>
          <Flex align="center">
            <Text mr="2">{copyText.buttonLabelNewIssue}</Text>
            <FaPlus />
          </Flex>
        </Link>
      </Button>
    </Flex>
  );
};

export default IssueTableControls;
