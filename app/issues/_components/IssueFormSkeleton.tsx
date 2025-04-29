import Skeleton from "@/app/_components/Skeleton";
import { Box } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton className="mb-2" height="2rem" width="10rem" />
      <Skeleton className="mb-2" height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
