"use client";

import Spinner from "@/app/_components/Spinner";
import paths from "@/app/paths";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import copyText from "../../copyText";

const DeleteIssueButton = ({ issueID }: { issueID: number }) => {
  const router = useRouter();

  //
  // State
  //

  const [error, setError] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  //
  // Handlers
  //

  const deleteIssue = async (): Promise<void> => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueID}`);
      router.push(paths.issues);
      router.refresh();
    } catch (error) {
      setError(true);
      setIsDeleting(false);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            {isDeleting ? (
              <Spinner />
            ) : (
              <>
                <Text>{copyText.deleteIssueButtonLabel}</Text>
                <FaTrash />
              </>
            )}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>
            {copyText.alertDialogueDeleteTitle}
          </AlertDialog.Title>
          <AlertDialog.Description>
            {copyText.alertDialogueDeleteIssueDescription}
          </AlertDialog.Description>
          <Flex gap="3" justify="end" mt="4">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                {copyText.alertDialogueCancelButtonLabel}
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" variant="solid" onClick={deleteIssue}>
                {copyText.deleteIssueButtonLabel}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {/* Error Dialogue */}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>
            {copyText.alertDialogueDeleteErrorTitle}
          </AlertDialog.Title>
          <AlertDialog.Description>
            {copyText.alertDialogueDeleteErrorDescription}
          </AlertDialog.Description>
          <Flex justify="end" mt="4">
            <Button color="gray" variant="soft" onClick={() => setError(false)}>
              {copyText.alertDialogueCloseButtonLabel}
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
