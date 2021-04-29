import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  Input,
  Stack,
} from "@chakra-ui/core";
import React, { ChangeEvent, FC, FormEvent, MouseEvent, useState } from "react";
import { observer } from 'mobx-react-lite';
import stores from "../store";

const CreateAccountForm: FC = observer(() => {
  const [userStore] = useState(() => stores.userStore)
  const { create: {
    username, password, telephone
  } } = userStore

  const validStyle = (error: boolean, input: string) => {
    if (error && typeof error === 'string' && input)
      return 'red'
    else if (!error && input)
      return 'green'
    return 'inherit'
  }

  const handleError = (error: boolean | string) => {
    if (typeof error === 'string')
      return <span style={{ color: 'red', fontSize: '11px' }}> {error} </span>
    else
      return null
  }

  return (
    <Stack spacing={6} as="form">
      <FormControl>
        <Input placeholder="Username" id="username" onChange={(e: ChangeEvent<HTMLInputElement>) => userStore.onCreateInput(e)} style={{ borderWidth: '2px', borderColor: validStyle(!!username.error, username.input) }} />
        {handleError(username.error)}
      </FormControl>
      <FormControl>
        <Input placeholder="Telephone" id="telephone" onChange={(e: ChangeEvent<HTMLInputElement>) => userStore.onCreateInput(e)} style={{ borderWidth: '2px', borderColor: validStyle(!!telephone.error, telephone.input) }} />
        {handleError(telephone.error)}
      </FormControl>
      <FormControl>
        <Input placeholder="Password" id="password" type="password" onChange={(e: ChangeEvent<HTMLInputElement>) => userStore.onCreateInput(e)} style={{ borderWidth: '2px', borderColor: validStyle(!!password.error, password.input) }} />
        {handleError(password.error)}
      </FormControl>
      <FormControl>
        <Checkbox variantColor="green" id="terms" onChange={(e: ChangeEvent<HTMLInputElement>) => userStore.toggleTerms()}>
          I agree to the terms and conditions
        </Checkbox>
      </FormControl>

      <Divider />

      <Button
        alignSelf="flex-end"
        rightIcon="arrow-forward"
        isDisabled={!userStore.canSubmit}
        variantColor="green"
        size="lg"
        onClick={(e: MouseEvent<HTMLButtonElement>) => userStore.onSubmit()}
      >
        Submit form
      </Button>
    </Stack>
  );
});
export default CreateAccountForm