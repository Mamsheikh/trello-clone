import React, { FC } from 'react';
import { Button, Image, Flex, Box, Spacer } from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { GrLogout } from 'react-icons/gr';

type IProps = {
  bg?: string;
};

const NavBar: FC<IProps> = ({ bg }) => {
  const renderButtons = () => {
    // if (user?.isValid) {
    //   return (
    //     <Button
    //       fontSize="20"
    //       color="danger"
    //       variant="link"
    //       float="right"
    //       mr="2"
    //       pr="2"
    //       onClick=''>
    //       <GrLogout />
    //     </Button>
    //   );
    // }

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
        {renderButtons()}
      </Flex>
    </Box>
  );
};

NavBar.propTypes = {
  bg: PropTypes.string,
};

export default NavBar;
