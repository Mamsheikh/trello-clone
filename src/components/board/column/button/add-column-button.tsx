import React, { FC } from 'react';
import { Box, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

type Props = {
  addColumn: () => void;
  loading: boolean;
};

const AddColumnButton: FC<Props> = ({ addColumn, loading }) => {
  return (
    <Box
      rounded='lg'
      height='auto'
      width='272px'
      display='flex'
      flexDirection='column'
      mt='10px'
      mx='10px'
    >
      <Button
        size='xs'
        my='10px'
        mx='5px'
        backgroundColor='primary'
        color='black'
        onClick={addColumn}
        isLoading={loading}
        // disabled={columnRequest}
        loadingText='Adding column'
      >
        + Add a Column
      </Button>
    </Box>
  );
};

export default AddColumnButton;
