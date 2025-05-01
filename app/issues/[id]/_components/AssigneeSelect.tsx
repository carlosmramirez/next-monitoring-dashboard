"use client";

import Skeleton from "@/app/_components/Skeleton";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import copyText from "../../copyText";

const defaultUsers: User[] = [];

const AssigneeSelect = () => {
  const {
    data: users = defaultUsers,
    isLoading: isLoadingUsers,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    retry: 3,
  });

  if (isLoadingUsers) {
    return <Skeleton height="1.75rem" />;
  }

  if (error) {
    return null;
  }

  return (
    <Select.Root>
      <Select.Trigger placeholder={copyText.selectAssigneePlaceHolder} />
      <Select.Content>
        <Select.Group>
          <Select.Label>{copyText.selectAssigneeLabel}</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {`${user.name} (${user.email})`}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
