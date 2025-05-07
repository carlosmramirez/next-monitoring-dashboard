"use client";

import paths from "@/app/paths";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import copyText from "../copyText";

type StatusFilter = { label: string; status: Status | "" };

const statusFilterOptions: StatusFilter[] = [
  { label: copyText.issueStatusFilterLabelAll, status: "" },
  { label: copyText.issueStatusFilterLabelClosed, status: Status.CLOSED },
  {
    label: copyText.issueStatusFilterLabelInProgress,
    status: Status.IN_PROGRESS,
  },
  { label: copyText.issueStatusFilterLabelOpen, status: Status.OPEN },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") ?? ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();

        if (status) {
          params.append("status", status);
        }

        if (searchParams.has("orderBy")) {
          params.append("orderBy", searchParams.get("orderBy")!);
        }

        const query = params.size ? `?${params.toString()}` : "";
        router.push(`${paths.issues}/${query}`);
      }}
    >
      <Select.Trigger placeholder={copyText.issueStatusFilterPlaceholder} />
      <Select.Content position="popper">
        <Select.Group>
          {statusFilterOptions.map((filter) => (
            <Select.Item key={filter.label} value={filter.status}>
              {filter.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
