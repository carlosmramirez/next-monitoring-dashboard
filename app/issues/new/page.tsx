"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios, { AxiosError } from "axios";
import SimpleMDE from "react-simplemde-editor";
import copyText from "../copyText";
import "easymde/dist/easymde.min.css";
import paths from "@/app/paths";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type CreateIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();

  //
  // Hooks
  //

  const { control, formState, handleSubmit, register } =
    useForm<CreateIssueForm>({
      resolver: zodResolver(createIssueSchema),
    });
  const [error, setError] = useState<string>();

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
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push(paths.issues);
          } catch (error) {
            setError(copyText.createNewIssueFormErrorMessage);
          }
        })}
      >
        <Text size="5" weight="bold">
          {copyText.createNewIssueFormTitle}
        </Text>
        <TextField.Root>
          <TextField.Input
            placeholder={copyText.placeholder_title}
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage children={formState.errors.title?.message} />
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
        <ErrorMessage children={formState.errors.description?.message} />
        <Button className="w-20" disabled={!formState.isValid}>
          {formState.isSubmitting ? <Spinner /> : copyText.buttonLabelSubmit}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
