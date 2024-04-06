import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({Arr=[],currency,days}) => {
   const price=[];
   const date=[]
//  console.log(Arr);
 for (let i = 0; i < Arr.length; i++) {
    // if(days==="24h") date.push(new Date(Arr[i][0]).toLocaleTimeString())
    // else date.push(new Date(Arr[i][0]).toLocaleDateString())
    if(days==="24h") date.push(new Date(Arr[i][0]).toLocaleTimeString());
    else date.push(new Date(Arr[i][0]).toLocaleDateString())
    price.push(Arr[i][1])
    
 }
//  console.log(price);

 const data={
    labels:date,
    datasets:[{
        label:`price in ${currency}`,
        data:price,borderColor:"rgb(243,43,75)",backgroundColor:"rgb(243,43,75,.34)"
    }]
  }
   return <Line 
   
  options={{
    responsive:true,
  }}
  data={data}
  >
    
  </Line>
};

export default Chart;
