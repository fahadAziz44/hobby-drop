import React from 'react'

import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import SinglePageForm from 'src/templates/SinglePageForm'

interface ISignupFormInputs {
  email: string
  firstName: string
  lastName?: string
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
  const router = useRouter()
  const toast = useToast()
  const onSubmit: SubmitHandler<ISignupFormInputs> = async (data) => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.status === 201) {
      const userObj = await res.json()
      toast({
        title: 'Account Created',
        description: `${userObj.user.firstName} user created successfuly`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      router.push('http://localhost:3000/user')
    } else {
      const nost = await res.text()
      // eslint-disable-next-line no-console
      console.error('error occured ', nost)
      toast({
        title: 'Signup Error',
        description: nost,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

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
          id="firstName"
          className="mt-10"
          isInvalid={Boolean(errors.firstName)}
        >
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            placeholder="First Name"
            {...register('firstName', { required: true })}
          />
          <FormErrorMessage>
            {errors.firstName?.message || errors.firstName?.type}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="lastName"
          className="mt-10"
          isInvalid={Boolean(errors.lastName)}
        >
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            placeholder="Last Name"
            {...register('lastName')}
          />
          <FormErrorMessage>
            {errors.lastName?.message || errors.lastName?.type}
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
          id="repassword"
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
