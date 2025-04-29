"use client";

import ErrorMessage from "@/app/_components/ErrorMessage";
import Spinner from "@/app/_components/Spinner";
import paths from "@/app/paths";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Box, Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import copyText from "../copyText";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

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
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState<string>();

  //
  // Handlers
  //

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push(paths.issues);
    } catch (error) {
      setError(copyText.createNewIssueFormErrorMessage);
    }
  });

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
        <ErrorMessage children={errors.title?.message} />
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
        <ErrorMessage children={errors.description?.message} />
        <Button className="w-20" disabled={!isValid || isSubmitting}>
          {isSubmitting ? <Spinner /> : copyText.buttonLabelSubmit}
        </Button>
      </form>
    </Box>
  );
};

export default IssueForm;
