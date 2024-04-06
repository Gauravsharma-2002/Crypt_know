import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { server } from '..';
import { Container, HStack,Button, RadioGroup ,Radio} from '@chakra-ui/react';
import CoinsComponent from './CoinsComponent';
import Error from './Error';
import Loader from './Loader';


const Coin = () => {

const [coins,setCoins]=useState();
const [error,setError]=useState(false);
const [loading,setLoading]=useState(true);
const [page,setPage]=useState(1);
const [currency,setCurrency]=useState("inr");
const currencySymbol=currency==="inr"?"₹":currency==="eur"?"€":"$";

const changePage=(index)=>{
  setPage(index);
  setLoading(true);
}

const btns=new Array(132).fill(1);

useEffect(() => {

  const fetchCoins=async ()=>{
  try {
      const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      setCoins(data);
      setLoading(false)
      // console.log(data);
  } catch (error) {
    setError(true);
    setLoading(false);
  }

  }
  fetchCoins();
}, [currency,page])

  if(error) return <Error message={"Error while fetching Coins"}/>

  return (
    


    <Container maxW={"container.xl"} p={"6"}>
     {
      loading?<Loader/>:
      <>
      <RadioGroup value={currency} onChange={setCurrency}>
        <HStack>
          <Radio  value={"inr"} >INR</Radio>
          <Radio  value={"usd"} >USD</Radio>
          <Radio  value={"eur"} >EUR</Radio>
        </HStack>
      </RadioGroup>
       <HStack wrap={"wrap"} spacing={"5"} p={"2"} justifyContent={"center"}>
        {
          coins.map((i)=>(
            <CoinsComponent name={i.name} symbol={i.symbol} image={i.image} price={i.current_price} key={i.id} id={i.id} currencySymbol={currencySymbol}/>
          ))
        }

      </HStack>
      <HStack overflow={"auto"} w={"full"} spacing={"4"}>
       {
        btns.map((item,index)=>(
          <Button p={'7'} bgColor={"blackAlpha.900"} color={"white"} key={index} onClick={()=>changePage(index+1)} >{index+1}</Button>
        ))
       }
      </HStack>
      </>
    
     }

    </Container>
  )
}

export default Coin