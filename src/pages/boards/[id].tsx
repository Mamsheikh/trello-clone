import React from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useBoardQuery } from '../../generated/graphql';

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
      {/* <UserNavbar />
    <SubNavbar board={board} />
    <BoardColumns /> */}
    </Box>
  );
};

export default Board;
