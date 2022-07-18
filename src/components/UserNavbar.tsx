import React from 'react';
import {
  Button,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Spacer,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useLogoutMutationMutation, User } from '../generated/graphql';
import { AiOutlineHome } from 'react-icons/ai';
import { SiTrello } from 'react-icons/si';
import { useRouter } from 'next/router';

interface UserNavbarProps {
  user: User;
}

const UserNavbar: React.FC<UserNavbarProps> = ({ user }) => {
  const [logout, { client }] = useLogoutMutationMutation();
  const router = useRouter();
  const renderButtons = () => {
    if (user) {
      return (
        <>
          <Menu>
            <MenuButton mr='5px'>
              <Avatar
                size='sm'
                name={user?.fullName}
                color='white'
                src='https://bit.ly/tioluwani-kolawole'
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={async () => {
                  await logout({
                    onCompleted: () => {
                      router.push('/login');
                    },
                  });
                  await client.resetStore();
                }}
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </>
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
    <Box boxShadow='sm' bg='rgba(0,0,0,0.2)' display='flex'>
      <Link href='/home'>
        <Button size='xs' ml='5px' my='5px'>
          <AiOutlineHome />
        </Button>
      </Link>
      <Link href='/boards'>
        <Button size='xs' ml='5px' mr='10px' my='5px'>
          Boards
        </Button>
      </Link>
      <Spacer />
      <Box m='10px' color='white'>
        <SiTrello />
      </Box>
      <Text fontWeight='bold' fontSize='20px' mt='2px' color='white'>
        Trello clone
      </Text>
      <Spacer />
      {renderButtons()}
    </Box>
  );
};

export default UserNavbar;
