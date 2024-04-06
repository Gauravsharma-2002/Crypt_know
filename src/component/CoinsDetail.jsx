import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Image,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import { useParams } from 'react-router-dom';
import Error from './Error';
import Chart from './Chart';

const CoinsDetail = () => {
  const [coin, setCoin] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState('24h');
  const [chartArr,setChartArr]=useState([]); 
  const params = useParams();
  const btns=["24h","7d","14d","30d","60d","200d","1y","max"];
  const changeStat=(val)=>{
    switch (val) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d4h":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
    
      default:
        setDays("365d");
        setLoading(true);
        break;
    }
  }

  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const {data:charData}=await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        // console.log(data);
        // console.log(charData.prices);
      
        setCoin(data);
        setChartArr(charData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [params.id,currency,days]);

  if (error) return <Error message={'Some problem in fetching coin details'} />;
  return ( 
    <Container w={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box w={'full'}>
            <Chart  Arr={chartArr} currency={currencySymbol}  days={days} />
          </Box>
        <HStack p={"1"} justifyContent={"start"} spacing={"4"} wrap={"wrap"} w={"full"}>
          {
            btns.map((i)=>(
              <Button key={i} onClick={()=>changeStat({i})}>{i}</Button>
            ))
          }
        </HStack>


          <RadioGroup value={currency} onChange={setCurrency}>
            <HStack>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'usd'}>USD</Radio>
              <Radio value={'eur'}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack alignItems={'start'} spacing={'4'} p={'6'}>
            <Text opacity={'.7'} fontSize={'sm '} alignSelf={'center'}>
              Last Updated on{' '}
              {Date(coin.market_data.last_updated).split('G')[0]}
            </Text>
            <Image
              src={coin.image.large}
              w={'19'}
              h={'19'}
              objectFit={'contain'}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {coin.market_data.price_change_percentage_24h}
              </StatHelpText>
            </Stat>

            <Badge
              bgColor={'blackAlpha.900'}
              fontSize={'2xl'}
              color={'white'}
              p={'4'}
              w={'20'}
            >
              {`# ${coin.market_data.market_cap_rank}`}
            </Badge>
            <CustomBar
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
            />
          </VStack>
          <Box w={'full'} p={'4'}>
            <Item
              tilte={`total_supply`}
              value={`${coin.market_data.total_supply}`}
            />
            <Item
              tilte={`circulating_supply`}
              value={`${coin.market_data.circulating_supply}`}
            />
            <Item
              tilte={`market_cap`}
              value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
            />
            <Item
              tilte={`market_cap`}
              value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
            />
            <Item
              tilte={`total_volume`}
              value={`${currencySymbol}${coin.market_data.total_volume[currency]}`}
            />
            <Item
              tilte={`All time Low`}
              value={`${currencySymbol}${coin.market_data.atl[currency]}`}
            />
            <Item
              tilte={`All time High`}
              value={`${currencySymbol}${coin.market_data.ath[currency]}`}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ high, low }) => (
  <VStack w={'full'}>
    <Progress value={60} w={'full'} colorScheme="teal" />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} color={'red'} fontSize={'sm'} />

      <Text fontSize={'lg'}>24Hr Range</Text>
      <Badge children={high} color={'green'} fontSize={'md'} />
    </HStack>
  </VStack>
);

const Item = ({ value, tilte }) => (
  <HStack w={'full'} justifyContent={'space-between'} p={'4'}>
    <Text fontFamily={'Odibee Sans'} fontSize={'lg '}>
      {tilte}
    </Text>
    <Text fontSize={'lg'}>{value}</Text>
  </HStack>
);
export default CoinsDetail;
