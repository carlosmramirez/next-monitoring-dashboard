"use client";

import ErrorMessage from "@/app/_components/ErrorMessage";
import Spinner from "@/app/_components/Spinner";
import paths from "@/app/paths";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Box, Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import copyText from "../copyText";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();

  //
  // Hooks
  //

  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState<string>();

  //
  // Handlers
  //

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }

      router.push(paths.issues);
      router.refresh();
    } catch (error) {
      setError(copyText.createNewIssueFormErrorMessage);
    }
  });

  //
  // Render
  //

  const submitButtonLabel = issue
    ? copyText.buttonLabelUpdateIssue
    : copyText.buttonLabelSubmitNewIssue;

  return (
    <Box className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Box className="flex align-middle justify-between h-full w-full">
            <Callout.Text>{error}</Callout.Text>
            <Button onClick={() => setError("")}>X</Button>
          </Box>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <Text size="5" weight="bold">
          {issue
            ? copyText.editIssueFormTitle
            : copyText.createNewIssueFormTitle}
        </Text>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder={copyText.placeholder_title}
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message} </ErrorMessage>
        <Controller
          control={control}
          defaultValue={issue?.description}
          name="description"
          render={({ field }) => (
            <SimpleMDE
              placeholder={copyText.placeholder_description}
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Box className="w-32">
          <Button className="w-full" disabled={!isValid || isSubmitting}>
            {isSubmitting ? <Spinner /> : submitButtonLabel}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default IssueForm;
