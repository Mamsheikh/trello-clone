import React, { useEffect } from 'react';
// import NavBar from '@/src/components/navbar';
import { Box, Image, Flex, Text } from '@chakra-ui/react';
import NavBar from '../navbar';
import { useRouter } from 'next/router';
import { useMeQuery } from '../../generated/graphql';

const WelcomeScreen = (): JSX.Element => {
  const router = useRouter();
  const { data } = useMeQuery();

  // useEffect(() => {
  if (data?.me) {
    router.push('/home');
  }
  // }, [data?.me]);
  return (
    <>
      <Box bgGradient='linear(darkblue, white)' height='100vh'>
        <NavBar />
        <Flex
          alignItems='center'
          flexDirection={['column', 'column', 'row', 'row']}
          justifyContent='center'
          p='4rem'
        >
          <Box>
            <Text
              fontSize={['40px', '40px', '50px', '50px']}
              fontWeight='bold'
              lineHeight='50px'
            >
              Trello helps teams move work forward.
            </Text>
            <Text
              fontSize={['1rem', '1rem', '1.5rem', '1.5rem']}
              width={['100%', '100%', '50%', '50%']}
            >
              Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is
              unique - accomplish it all with Trello.
            </Text>
          </Box>
          <Box>
            <Image
              height={['200px', '300px', '400px', '500px']}
              src='/homepage/home-illustration.svg'
              alt='brand logo'
            ></Image>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default WelcomeScreen;
