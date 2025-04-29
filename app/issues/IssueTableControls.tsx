import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import copyText from "../copyText";
import paths from "../paths";
import { FaPlus } from "react-icons/fa";

const IssueTableControls = () => {
  return (
    <div className="mb-5">
      <Button color="indigo">
        <Link href={paths.newIssue}>{copyText.buttonLabelNewIssue}</Link>
        <FaPlus />
      </Button>
    </div>
  );
};

export default IssueTableControls;
