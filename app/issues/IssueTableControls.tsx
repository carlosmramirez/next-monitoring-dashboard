import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import copyText from "../copyText";
import paths from "../paths";

const IssueTableControls = () => {
  return (
    <div className="mb-5">
      <Button color="indigo">
        <Link href={paths.newIssue}>
          <Flex align="center">
            <Text mr="2">{copyText.buttonLabelNewIssue}</Text>
            <FaPlus />
          </Flex>
        </Link>
      </Button>
    </div>
  );
};

export default IssueTableControls;
