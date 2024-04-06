import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HStack bgColor={'blackAlpha.900'}  p={'4'} spacing={"6"}
    >
      <Button variant={"unstyled" } color={"white"} transition={"all .3s"}
    css={{
      "&:hover":{
        transform:"scale(1.1)"
      }
    }}>
        <Link to="/">Home</Link>
      </Button>
      <Button variant={"unstyled" } color={"white"} transition={"all .3s"}
    css={{
      "&:hover":{
        transform:"scale(1.1)"
      }
    }}>
        <Link to="/exchanges">Exchanges</Link>
      </Button>
      <Button variant={"unstyled" } color={"white"} transition={"all .3s"}
    css={{
      "&:hover":{
        transform:"scale(1.1)"
      }
    }}>
        <Link to="/coins">Coins</Link>
      </Button>

    </HStack>
  );
};

export default Header;
