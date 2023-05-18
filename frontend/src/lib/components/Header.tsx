import { HStack, Text } from '@chakra-ui/react';
import Logo from './Logo';

const Header = () => {
  return (
    <HStack justify="space-between" width="full">
      <Logo />
      <Text>Share feedback</Text>
      <h1>jsdkj</h1>
    </HStack>
  );
};

export default Header;
