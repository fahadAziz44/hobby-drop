import React from 'react'

import {
  useToast,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import Link from 'next/link'
import router from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import SinglePageForm from 'src/templates/SinglePageForm'

interface ILoginFormInputs {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>()
  const toast = useToast()

  const onSubmit: SubmitHandler<ILoginFormInputs> = async (data) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.status === 201) {
      router.push('/user')
    } else {
      const nost = await res.text()
      toast({
        title: 'Login Error',
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
        <Center h="100px" color="white">
          <Button colorScheme="teal" type="submit">
            Login
          </Button>
        </Center>
      </form>
      <Link href="/signup" passHref>
        <div className="w-full flex justify-center text-sm text-blue-300 hover:text-blue-600 cursor-pointer">
          Signup here
        </div>
      </Link>
    </SinglePageForm>
  )
}

export default Login
