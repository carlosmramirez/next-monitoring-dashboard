import paths from "@/app/paths";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import copyText from "../../copyText";

const EditIssueButton = ({ issueID }: { issueID: number }) => {
  return (
    <Link href={`${paths.issues}/${issueID}/edit`}>
      <Button className="w-full">
        <Text>{copyText.editIssueButtonLabel}</Text>
        <FaEdit />
      </Button>
    </Link>
  );
};

export default EditIssueButton;
