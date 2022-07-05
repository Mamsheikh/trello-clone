import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { Field, useField } from 'formik';

type Props = InputProps & { name: string; isRequired?: boolean };

const LoginInput: React.FC<Props> = ({ name, ...props }) => {
  const [field, meta] = useField({ name });
  return (
    <FormControl my='4' isInvalid={!!meta.error && meta.touched}>
      <Input
        as={Field}
        {...props}
        {...field}
        autoComplete='off'
        // placeholder={`Enter your ${name}`}
        // focusBorderColor='purple.500'
        // variant='flushed'
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
export default LoginInput;
