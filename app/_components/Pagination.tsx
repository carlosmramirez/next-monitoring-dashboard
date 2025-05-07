"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import copyText from "../copyText";

interface Props {
  currentPage: number;
  itemCount: number;
  pageSize: number;
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const pageCount = Math.ceil(itemCount / pageSize);

  return (
    <Flex align="center" justify="between" mt="3" px="3" width="100%">
      <Flex gap="2">
        <Button
          color="indigo"
          disabled={currentPage === 1}
          variant="soft"
          onClick={() => handleChangePage(currentPage - 1)}
        >
          <FaChevronLeft />
        </Button>
        <Button
          color="indigo"
          disabled={currentPage === pageCount}
          variant="soft"
          onClick={() => handleChangePage(currentPage + 1)}
        >
          <FaChevronRight />
        </Button>
      </Flex>
      <Text size="2">{`${copyText.pageCountLabel} ${currentPage} of ${
        pageCount > 1 ? pageCount : 1
      }`}</Text>
    </Flex>
  );
};

export default Pagination;
