import { Button } from "@radix-ui/themes";
import React from "react";
import copyText from "./copyText";
import Link from "next/link";
import paths from "../paths";

const IssuesPage = () => {
  return (
    <>
      <Button color="indigo">
        <Link href={paths.newIssue}>{copyText.buttonLabelNewIssue}</Link>
      </Button>
    </>
  );
};

export default IssuesPage;
