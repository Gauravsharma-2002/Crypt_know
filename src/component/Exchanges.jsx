import React, { useEffect, useState } from 'react';
import { server } from '../index';
import axios from 'axios';
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        // console.log(data);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error) return <Error />;

  return (
    <Container maxW={'container.xl'} minH={'100vh'}>
      {loading ? (
        <Loader />
      ) : (
        <HStack wrap={'wrap'} spacing={'4'} justifyContent={'center'} p={'5'}>
          {exchanges.map((item, index) => (
            <ExchangeCard
              key={item.id}
              name={item.name}
              image={item.image}
              url={item.url}
              rank={item.trust_score_rank}
            />
          ))}
        </HStack>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, url, image, rank }) => (
  <a href={url} target="blank">
    <VStack
      p={'8'}
      w={'52'}
      h={'52'}
      shadow={'xl'}
      borderRadius={'lg '}
      transitio={'all 1s'}
      m={'4'}
      css={{
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Image src={image} w={'10'} h={'10'} objectFit={'contain'} />
      <Heading fontSize={'md'} fontFamily={'cursive'} noOfLines={1}>
        {rank}
      </Heading>
      <Text fontFamily={'sans-serif'}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
