import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import img from"../assets/btc.png"
import {motion}from "framer-motion"
const Home = () => {
  return (
    <Box w={'100%'} h={'80vh'} bgColor={'blackAlpha.900'}>
      <motion.div 
      style={{
        height:"75vh"
          
      }}
      animate={{
        translateY:"20px"
      }}
      transition={{
        duration:2,
        repeat:Infinity,
        repeatType:"reverse"
        
      }}>
      <Image w={'full'} h={'full'} objectFit={'contain'} src={img} filter={"grayscale(1)"} />
      
      </motion.div>
      <Text fontWeight={'light'} fontSize={'lg'} textAlign={'center'} color={"whiteAlpha.700"} mt={"-15"}>
        CryptoMART
      </Text>
    </Box>
  );
};

export default Home;
