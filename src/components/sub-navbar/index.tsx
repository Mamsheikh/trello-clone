import React from 'react';
import { Box, Heading, Tooltip, Avatar } from '@chakra-ui/react';
import { Board } from '../../generated/graphql';
import BoardSettings from './BoardSettings';
import UnsplashDrawer from './unsplash-drawer';

type SubNavbarProps = {
  board: Board;
};

const SubNavbar: React.FC<SubNavbarProps> = ({ board }) => {
  return (
    <Box
      height='40px'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      bg='rgba(0,0,0,0.1)'
    >
      <Heading
        ml='0.5rem'
        color='white'
        as='h4'
        size='sm'
        whiteSpace='nowrap'
        // d='block'
      >
        {board?.name}
      </Heading>
      <Box>
        <Tooltip label={board?.user?.fullName} aria-label='A tooltip'>
          <Avatar
            size='sm'
            name={board?.user?.fullName}
            mr='5px'
            src='https://bit.ly/tioluwani-kolawole'
          />
        </Tooltip>
      </Box>
      <Box>
        <BoardSettings board={board} />
        <UnsplashDrawer />
        {/* {/* <InviteModal /> */}
      </Box>
    </Box>
  );
};
export default SubNavbar;
