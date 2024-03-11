import React from 'react'
import {Line } from 'react-chartjs-2'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,// x axis
    LinearScale,
    PointElement,
   // Legend,
    Tooltip
}from 'chart.js'; 

ChartJS.register(
    LineElement,
    CategoryScale,// x axis
    LinearScale,
    PointElement,
   // Legend,
    Tooltip
)


export default function Linechart() {

const [expenseData, setExpenseData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        'rgb(0, 197, 0)',
        'rgb(204, 223, 243)'
      ],
      
     // borderWidth: 2,
      //radius: '40%'
    }]
  });
  const [avgExpense,setAvgExpense] = useState(0);
 // let i = 0 ;


  useEffect(() => {
    axios
      .get('https://dataforexpensetracker.onrender.com/payments')
      .then((res) => {
        const expenses = res.data;

        const dateMap = new Map();
        expenses.forEach((expense) => {
          //++i;
          const label = expense.date; // Expense date is  used as label
          const amount = parseFloat(expense.amount); // amount is set for the particular day 
          if (dateMap.has(label)) {
            dateMap.set(label, dateMap.get(label) + amount);
           // setAvgExpense = amount/i;
            //console.log(avgExpense);
          } else {
            dateMap.set(label, amount);
          }
        });

      // const date = [...dateMap.keys()];
      // const amount = [...dateMap.values()];     
      // Sort the data by date

        const sortedData = Array.from(dateMap.entries()).sort((a, b) => new Date(a[0]) - new Date(b[0]));
        const limitedData = sortedData.slice(-10);  
        const date = limitedData.map(([label, _]) => label);
        const amount = limitedData.map(([_, value]) => value);


        const data = {
          labels: date,
          datasets: [{
            data: amount,
            backgroundColor: [
              'rgb(0, 197, 0)',
              'rgb(204, 223, 243)',
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
              'rgb(255, 0, 0)',
              'rgb(0, 255, 0)',
            ],

           // borderWidth: 2,
           // radius: '40%'
          }]
        };

        setExpenseData(data);
      })
      .catch((err) => console.log(err));
  }, []);

const options= {
    plugins : {
     legend : {
      display: false
    }
    }
};

  return (
      <div>
          <div style = {{ display : 'flex' ,alignItems: 'center', justifyContent: 'center'}} >
         
              <div style = { { alignItems: 'center', width :'600px' , height :'600px', padding : '20px'}}>
              <h1  style = {{ alignItems: 'center', justifyContent: 'center', padding : '20px'}}>Daily Expense </h1>
              <Line 
              data={expenseData}
              options = {options}
              >
              </Line>
          </div>
          </div>
      </div>
  );
}
