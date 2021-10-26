import React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'

import '../styles/main.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
)

export default MyApp
