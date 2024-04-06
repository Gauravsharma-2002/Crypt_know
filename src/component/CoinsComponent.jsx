import React from 'react'
import {VStack,Image,Heading,Text}from "@chakra-ui/react"
import {Link}from "react-router-dom"

const CoinsComponent = ({id,name,price,image,symbol,currencySymbol="₹"}) => {
  return (
    <Link to={`/coins/${id}`}>
    <VStack
      p={'8'}
      w={'52'}
      h={'52'}
      shadow={'xl'}
      borderRadius={'lg '}
      transitio={'all 1s'}
      m={"4"}
      css={{
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Image src={image} w={'10'} h={'10'} objectFit={'contain'} />
      <Heading fontSize={'md'} fontFamily={'mono'} noOfLines={1} textTransform={"uppercase"}>
        {symbol}
      </Heading>
      <Text fontFamily={'sans-serif'} noOfLines={1}>{name}</Text>
      <Text fontFamily={'sans-serif'} noOfLines={1}>{price?`${currencySymbol}${price}`:"NA"}</Text>
    </VStack>
  </Link>
  )
}

export default CoinsComponent
