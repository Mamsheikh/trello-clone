import React from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useBoardQuery } from '../../generated/graphql';
import UserNavbar from '../../components/UserNavbar';
import SubNavbar from '../../components/sub-navbar';
// import SubNavbar from '../../components/SubNavbar';

const Board = () => {
  const router = useRouter();
  const { data } = useBoardQuery({
    variables: {
      boardId: router.query.id as string,
    },
  });
  return (
    <Box
      backgroundImage={`url('${data?.board?.backgroundImage}')`}
      backgroundPosition='center'
      h='100vh'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
    >
      <UserNavbar user={data?.board?.user} />
      <SubNavbar board={data?.board} />
      {/* <BoardColumns />  */}
    </Box>
  );
};

export default Board;
