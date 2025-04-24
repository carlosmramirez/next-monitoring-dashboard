import { Button } from "@radix-ui/themes";
import React from "react";
import copyText from "./copyText";

const IssuesPage = () => {
  return (
    <>
      <Button color="indigo">{copyText.newIssueButtonLabel}</Button>
    </>
  );
};

export default IssuesPage;
