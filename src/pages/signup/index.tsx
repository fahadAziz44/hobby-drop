import React from 'react'

import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'

import SinglePageForm from 'src/templates/SinglePageForm'

interface ISignupFormInputs {
  email: string
  password: string
  reTypePass: string
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISignupFormInputs>()
  const onSubmit: SubmitHandler<ISignupFormInputs> = async (data) =>
    console.log(data)

  return (
    <SinglePageForm>
      <form className="relative" onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          id="email"
          className="mt-10"
          isInvalid={Boolean(errors.email)}
        >
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="Enter Email"
            {...register('email', { required: true })}
          />
          <FormErrorMessage>
            {errors.email?.message || errors.email?.type}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="password"
          className="mt-10"
          isInvalid={Boolean(errors.password)}
        >
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter Password"
            {...register('password', { required: true })}
          />
          <FormErrorMessage>
            {errors.password?.message || errors.password?.type}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="password"
          className="mt-10"
          isInvalid={Boolean(errors.reTypePass)}
        >
          <FormLabel>Retype Password</FormLabel>
          <Input
            type="password"
            placeholder="Retype Password"
            {...register('reTypePass', {
              required: true,
              validate: {
                notEqual: (value) =>
                  value !== getValues('password')
                    ? 'Password does not match'
                    : undefined,
              },
            })}
          />
          <FormErrorMessage>
            {errors.reTypePass?.message || errors.reTypePass?.type}
          </FormErrorMessage>
        </FormControl>
        <Center h="100px" color="white">
          <Button colorScheme="teal" type="submit">
            Sign Up
          </Button>
        </Center>
      </form>
    </SinglePageForm>
  )
}

export default SignUp
