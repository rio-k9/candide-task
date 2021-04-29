import { Button, Text, Divider, Heading, Stack, Icon } from "@chakra-ui/core";
import React, { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import UserStore from "../store/user";
import stores from "../store";

const CreateAccountSuccess: FC = observer(() => {
  const [userStore] = useState(() => stores.userStore)
  const { user: {
    name
  } } = userStore


  return (
    <Stack spacing={6} alignItems="center" textAlign="center">
      <Icon size={"64px"} name="check-circle" color="orange.400" />
      <Heading>Welcome, {name}!</Heading>
      <Text>You're all set up and ready to go!</Text>
      <Divider />
      <Button size="lg" rightIcon="arrow-forward" variantColor="green">
        Get started
      </Button>
    </Stack>
  );
})

export default CreateAccountSuccess
