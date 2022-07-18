import React, { FC, useEffect } from 'react';
import { Button, Image, Flex, Box, Spacer, Text } from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { GrLogout } from 'react-icons/gr';
import {
  useLogoutMutationMutation,
  useMeLazyQuery,
  useMeQuery,
} from '../../generated/graphql';
import { useRouter } from 'next/router';

type IProps = {
  bg?: string;
};

const isServer = () => typeof window === 'undefined';

const NavBar: FC<IProps> = ({ bg }) => {
  const { data, loading } = useMeQuery({
    errorPolicy: 'all',
  });

  // useEffect(() => {
  //   try {
  //     me();
  //   } catch (error) {
  //     console.log('failed to query user', error);
  //   }
  // }, [data?.me]);

  const [logout, { client }] = useLogoutMutationMutation();
  const router = useRouter();

  const renderButtons = () => {
    if (data?.me) {
      return (
        <Button
          fontSize='20'
          color='danger'
          variant='link'
          float='right'
          mr='2'
          pr='2'
          onClick={async () => {
            await logout({
              onCompleted: () => {
                router.push('/login');
              },
            });
            await client.resetStore();
          }}
        >
          <GrLogout />
        </Button>
      );
    }

    return (
      <>
        <Button
          fontSize='20'
          color='brand'
          variant='link'
          float='right'
          mr='2'
          pr='2'
        >
          <Link href='/login'>Log in</Link>
        </Button>
        <Button fontSize='md' colorScheme='green' color='white' m='4'>
          <Link href='/signup'>Sign up</Link>
        </Button>
      </>
    );
  };

  return (
    <Box bg={bg} boxShadow='md'>
      <Flex>
        <Image height='8' src='/trello-logo.svg' alt='brand logo' m='5'></Image>
        <Spacer />
        {loading ? <Text m='5'>Loading...</Text> : renderButtons()}
      </Flex>
    </Box>
  );
};

NavBar.propTypes = {
  bg: PropTypes.string,
};

export default NavBar;
