import {
  Flex,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  Image,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoginInput from '../components/LoginInput';
import { useLoginMutation } from '../generated/graphql';
import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState('');
  const [login, { error }] = useLoginMutation();

  const showLoginError = () => {
    if (!errMsg) return;

    return (
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle mr={2}>Error</AlertTitle>
        <AlertDescription>{error?.message}</AlertDescription>
        <CloseButton
          position='absolute'
          right='8px'
          top='8px'
          onClick={() => setErrMsg('')}
        />
      </Alert>
    );
  };
  return (
    <>
      <Box display='flex' justifyContent='center' alignItems='center' my='40px'>
        <Image
          height='20px'
          mt='2'
          src='/trello-icon.svg'
          alt='brand logo'
        ></Image>
        <Text fontWeight='bold' fontSize='28px' m='4px'>
          Trello
        </Text>
      </Box>

      <Flex
        alignItems='center'
        flexDirection={['column', 'column', 'row', 'row']}
        justifyContent='center'
      >
        <Image
          position='absolute'
          bottom='5%'
          left='5%'
          src='/login/left.svg'
          alt=' new user illustration'
          width={[0, '30%']}
        />
        <Image
          position='absolute'
          bottom='5%'
          right='5%'
          src='/login/right.svg'
          alt='task scheduler illustration'
          width={[0, '30%']}
          borderRadius='3px'
        />
        <Box
          p='25px 40px'
          width={['80%', '60%', '45%', '25%']}
          borderRadius='3px'
          bg='white'
          boxShadow='rgb(0 0 0 / 10%) 0 0 10px'
        >
          <Box
            textAlign='center'
            color='#5E6C84'
            mt='5'
            mb='25'
            fontSize={['16px', '16px', '20px', '20px']}
            fontWeight='semibold'
            lineHeight='normal'
          >
            <h1>Log in to Trello</h1>
          </Box>
          <Box my={4} textAlign='left'>
            {showLoginError()}
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .required('Password is required')
                  .min(6, 'Password too short')
                  .max(200, 'Password too long'),

                email: Yup.string()
                  .required('Email is required')
                  .email('Invalid email')
                  .max(200, 'Email too long'),
              })}
              onSubmit={async (values, actions) => {
                const creds = { ...values };
                actions.resetForm();
                try {
                  const { data } = await login({
                    variables: {
                      input: {
                        email: creds.email,
                        password: creds.password,
                      },
                    },
                    onCompleted(data) {
                      if (data.login) {
                        router.push('/home');
                      }
                    },
                  });
                } catch (error) {
                  setErrMsg((error as ApolloError).message);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <LoginInput
                    name='email'
                    isRequired
                    type='email'
                    placeholder='Enter email'
                  />

                  <LoginInput
                    name='password'
                    isRequired
                    type='password'
                    placeholder='Enter password'
                  />

                  <Button
                    fontWeight='semibold'
                    width='full'
                    mt={4}
                    type='submit'
                    // disabled={
                    //   !values.email || !values.fullName || !values.password
                    //   // !values.confirm
                    // }
                    bg='success'
                    color='white'
                    // onClick={registerUser}
                    isLoading={isSubmitting}
                    loadingText='Logging...'
                  >
                    Login
                  </Button>
                  <Box m='5' textAlign='center'>
                    <Link href='/signup'>
                      <a>
                        <Text
                          color='brand'
                          p={2}
                          _hover={{ textDecor: 'underline' }}
                        >
                          Signup for an account.
                        </Text>
                      </a>
                    </Link>
                  </Box>
                  {/* {showSignUpError()} */}
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
