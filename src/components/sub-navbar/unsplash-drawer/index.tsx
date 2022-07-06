import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import PropType from 'prop-types';
import React from 'react';
import { BsImages } from 'react-icons/bs';
import Unsplash from './Unsplash';

interface Props {
  boardId: string;
}
const UnsplashDrawer: React.FC<Props> = ({ boardId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef();

  const handleSave = async () => {
    //   await dispatch(saveBoard());
    onClose();
  };

  return (
    <>
      <Button size='xs' ml='2px' mr='10px' ref={btnRef} onClick={onOpen}>
        <BsImages />
      </Button>
      <Drawer
        size='sm'
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Choose background image</DrawerHeader>
          <DrawerBody>
            <Unsplash boardId={boardId} />
          </DrawerBody>
          <DrawerFooter>
            <Button
              colorScheme='blue'
              onClick={handleSave}
              loadingText='Saving'
              // isLoading={board.isLoading}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UnsplashDrawer;
