import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  Text,
  Button,
  Image,
  useToast,
  Alert,
  AlertDescription,
  CloseButton,
  AlertTitle,
  AlertIcon,
} from '@chakra-ui/react';
import { useState } from 'react';
import Link from 'next/link';
// import shortId from 'shortid';
// import checkEnvironment from '@/util/check-environment';
import { useRouter } from 'next/router';
import LoginInput from '../components/LoginInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSignupMutation } from '../generated/graphql';
import { ApolloError } from '@apollo/client';

const SignUp = (): JSX.Element => {
  const [errMsg, setErrMsg] = useState('');

  const toast = useToast();
  const router = useRouter();

  const [signup, { loading, error }] = useSignupMutation();

  const showToast = () => {
    toast({
      position: 'top',
      title: 'Account created.',
      description:
        "We've created your account. Redirecting you to login page in 3 seconds ",
      status: 'success',
      duration: 2500,
      isClosable: true,
    });
  };

  const redirectToLoginPage = (path = '/login') => {
    showToast();
    setTimeout(() => {
      window.location.href = path;
    }, 3000);
  };

  const showSignUpError = () => {
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

  const isButtonDisabled = () => {
    const isValidPassword = values.password !== values.confirmPassword;
    const isDisabled = !values.email || !values.fullName;

    return (
      isValidPassword ||
      isDisabled ||
      !values.password ||
      !values.confirmPassword
    );
  };

  return (
    <>
      <Box display='flex'>
        <Image
          height='30px'
          ml='auto'
          mr='auto'
          my='40px'
          src='/trello-logo.svg'
          display='inline-block'
          alt='brand logo'
        />
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
          src='/signup/sign-up-left.svg'
          alt=' team work illustration'
          width={[0, '25%']}
        />
        <Image
          position='absolute'
          bottom='5%'
          right='5%'
          src='/signup/sign-up-right.svg'
          alt='work together illustration'
          width={[0, '25%']}
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
            fontSize={['10px', '10px', '15px', '15px']}
            fontWeight='semibold'
            lineHeight='normal'
          >
            <h1>Sign up for your account</h1>
          </Box>
          <Box my={4} textAlign='left'>
            {showSignUpError()}
            {/* <Text textAlign='center' color='red' size='small'>
              {error?.message}
            </Text> */}
            <Formik
              initialValues={{
                email: '',
                fullName: '',
                password: '',
                confirm: '',
              }}
              validationSchema={Yup.object({
                fullName: Yup.string()
                  .required('Full name is required')
                  .max(200, 'Full name too long'),
                password: Yup.string()
                  .required('Password is required')
                  .min(6, 'Password too short')
                  .max(200, 'Password too long'),
                confirm: Yup.string()
                  .required('Password confirmation is required')
                  .oneOf([Yup.ref('password'), null], "Passwords don't match"),
                email: Yup.string()
                  .required('Email is required')
                  .email('Invalid email')
                  .max(200, 'Email too long'),
              })}
              onSubmit={async (values, actions) => {
                const creds = { ...values };
                // actions.resetForm();
                try {
                  const { data } = await signup({
                    variables: {
                      input: {
                        email: creds.email,
                        password: creds.password,
                        fullName: creds.fullName,
                      },
                    },
                    onCompleted: (data) => {
                      redirectToLoginPage();
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
                    name='fullName'
                    isRequired
                    type='text'
                    placeholder='Full name'
                  />
                  <LoginInput
                    name='password'
                    isRequired
                    type='password'
                    placeholder='Create password'
                  />
                  <LoginInput
                    name='confirm'
                    isRequired
                    type='password'
                    placeholder='Confirm password'
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
                    loadingText='Registering'
                  >
                    Sign up
                  </Button>
                  <Box m='5' textAlign='center'>
                    <Link href='/login'>
                      <a>
                        <Text
                          color='brand'
                          p={2}
                          _hover={{ textDecor: 'underline' }}
                        >
                          Already have an account? Log in.
                        </Text>
                      </a>
                    </Link>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SignUp;
