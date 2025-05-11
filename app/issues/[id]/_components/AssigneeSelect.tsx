"use client";

import Skeleton from "@/app/_components/Skeleton";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import copyText from "../../copyText";

const defaultUsers: User[] = [];

type Issue = {
  id: number;
  assigneeUserID: string | null;
};

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  //
  // Queries
  //

  const {
    data: users = defaultUsers,
    isLoading: isLoadingUsers,
    error,
  } = useGetUsers();

  //
  // Handlers
  //

  const handleSubmit = async (userID: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assigneeUserID: userID || null,
      });
    } catch (error) {
      toast.error(copyText.selectAssigneeErrorMessage);
    }
  };

  //
  // Render
  //

  if (isLoadingUsers) {
    return <Skeleton height="1.75rem" />;
  }

  if (error) {
    return null;
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assigneeUserID || ""}
        onValueChange={handleSubmit}
      >
        <Select.Trigger placeholder={copyText.selectAssigneePlaceHolder} />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>{copyText.selectAssigneeLabel}</Select.Label>
            <Select.Item value="">
              {copyText.selectAssigneeUnassigned}
            </Select.Item>
            {users.length > 0 ? (
              users.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                  {`${user.name}`}
                </Select.Item>
              ))
            ) : (
              <Select.Item
                key={copyText.selectAssigneeNoUsers}
                value="noUsers"
                disabled
              >
                {copyText.selectAssigneeNoUsers}
              </Select.Item>
            )}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useGetUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    retry: 3,
  });

export default AssigneeSelect;
