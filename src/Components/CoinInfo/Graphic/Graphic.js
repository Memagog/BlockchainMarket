import React,{ useEffect, useState, useMemo } from "react";
import { useSelector } from 'react-redux';
import { mainData } from '../../../redux/mainSlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function App() {    

  const graphic = useSelector(mainData);
  const [data, setData] = useState([
    {
      priceUsd: "", 
      time: 0, 
      date: ""
    }
  ]);
    
  useEffect(() => {       
      setData(graphic.data.history);                 
  }, [graphic])  

  const max = useMemo(() =>{
    let res = [];
    if (graphic.data.history.length > 0) {
      graphic.data.history.forEach((e) => {
        res.push(e.priceUsd);
      })
    }
    if (res.length > 0) {
        return Math.max(...res) | 0
    }      
  }, [graphic]);

  return (
    <LineChart width={700} height={700} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis padding={{ left: 40, right: 40 }} />
      <YAxis  type="number" domain={[0, (max+max*0.1)]} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="priceUsd"        
        stroke="#f5f5f5"
        activeDot={{ r: 8 }}
      />
      {/* <Line type="monotone"  stroke="#82ca9d" /> */}
    </LineChart>    
  );
}