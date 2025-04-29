"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import paths from "@/app/paths";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
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

type CreateIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();

  //
  // Hooks
  //

  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<CreateIssueForm>({
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
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <div className="flex align-middle justify-between h-full w-full">
            <Callout.Text>{error}</Callout.Text>
            <Button onClick={() => setError("")}>X</Button>
          </div>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <Text size="5" weight="bold">
          {copyText.createNewIssueFormTitle}
        </Text>
        <TextField.Root>
          <TextField.Input
            placeholder={copyText.placeholder_title}
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage children={errors.title?.message} />
        <Controller
          name="description"
          control={control}
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
    </div>
  );
};

export default NewIssuePage;
