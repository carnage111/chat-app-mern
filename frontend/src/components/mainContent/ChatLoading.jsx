import { Skeleton, Stack } from "@chakra-ui/react";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="40px" marginTop={"1em"}/>
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
    </Stack>
  );
};

export default ChatLoading;