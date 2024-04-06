import { Avatar, Stack, VStack, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Stack
      w={'full'}
      minH={'40'}
      bgColor={'blackAlpha.900'}
      direction={['column', 'row']}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <VStack
        w={'full'}
        h={'full'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text
          textAlign={['center', 'left']}
          fontWeight={'bold'}
          color={'whiteAlpha.900'}
        >
          About Us
        </Text>
        <Text fontSize={'sm'} color={'whiteAlpha.900'} textAlign={'center'}>
          {' '}
          providIng the Best and Reasonable advancemnt Consultancy on Crypto
        </Text>
      </VStack>
      <VStack
        w={'full'}
        h={'full'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Avatar boxSize={'20'} mt={['4', '0']} />
        <Text color={'whiteAlpha.700'}>Our Founder</Text>
      </VStack>
    </Stack>
  );
};

export default Footer;
