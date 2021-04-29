import { Box, Flex, Heading } from "@chakra-ui/core";
import React, { FC } from 'react';
import CreateAccountForm from "../components/CreateAccountForm";
import waves from "../assets/waves.svg";
import { observer } from "mobx-react-lite";

const CreateAccount: FC = observer(() => {

  return (
    <Flex
      backgroundColor="#f1f2f3"
      backgroundImage={`url(${waves})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="top center"
      h="100vh"
      w="100vw"
      flexDir="column"
      alignItems="center"
    >
      <Box flex={1} />
      <Heading
        w="calc(100vw - 2rem)"
        as="h1"
        size="2xl"
        mb={8}
        color="white"
        fontWeight="thin"
        textAlign="center"
      >
        Create an account
      </Heading>
      <Box
        rounded="lg"
        bg="white"
        shadow="lg"
        w="calc(100vw - 2rem)"
        maxW="md"
        px={8}
        py={10}
      >
        <CreateAccountForm />
      </Box>
      <Box flex={2} />
    </Flex>

  )
})

export default CreateAccount