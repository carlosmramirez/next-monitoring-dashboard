"use client";

import {
  Button,
  Text,
  TextArea,
  TextField,
  ThemePanel,
} from "@radix-ui/themes";
import React from "react";
import copyText from "../copyText";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <Text size="5" weight="bold">
        {copyText.createNewIssueFormTitle}
      </Text>
      <TextField.Root>
        <TextField.Input placeholder={copyText.placeholder_title} />
      </TextField.Root>
      <TextArea placeholder={copyText.placeholder_description} />
      <Button>{copyText.buttonLabelSubmit}</Button>
    </div>
  );
};

export default NewIssuePage;
