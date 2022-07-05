import { Button, Box } from '@chakra-ui/react';
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineCreditCard,
  AiOutlineBuild,
} from 'react-icons/ai';
import App from 'next/app';
import Link from 'next/link';
import React from 'react';
import NavBar from './navbar';

const Sidebar = (props) => {
  const { page } = props;

  const sidebarMenu = [
    { path: '/home', buttonName: 'Home', page: 'home', icon: AiOutlineHome },
    {
      path: '/boards',
      buttonName: 'Boards',
      page: 'boards',
      icon: AiOutlineCreditCard,
    },
    {
      path: '/templates',
      buttonName: 'Templates',
      page: 'templates',
      icon: AiOutlineBuild,
    },
    {
      path: '/settings',
      buttonName: 'Settings',
      page: 'settings',
      icon: AiOutlineSetting,
    },
  ];

  return (
    <>
      <NavBar bg='white' />
      <Box display='flex' mt='2%'>
        <Box
          height='80vh'
          width='20vw'
          boxShadow='base'
          rounded='lg'
          p='1em'
          ml='20px'
        >
          <Box display='flex' flexDirection='column'>
            {sidebarMenu.map((menu, index) => (
              <Link href={menu.path} key={index}>
                <Button
                  mt='5px'
                  mb='5px'
                  height='4rem'
                  borderRadius='1rem'
                  boxShadow={page === menu.page ? 'inner' : 'base'}
                  display='flex'
                  justifyContent='left'
                  colorScheme='gray'
                >
                  <>
                    <menu.icon size='20px' /> &nbsp; {menu.buttonName}
                  </>
                </Button>
              </Link>
            ))}
          </Box>
        </Box>
        <Box
          minHeight='50vh'
          flexGrow={3}
          mx='2%'
          boxShadow='base'
          rounded='lg'
          bg='white'
          p='1rem'
        >
          <h1>
            You can visit the boards page to see the Trello-clone functionality.
          </h1>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
