import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);
//ChartJS.defaults.plugins.legend.display = false;

export default function Bar_chart() {
    const [expenseData, setExpenseData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: 'red',
            borderColor: 'black',
            borderWidth: 1,
        }]
    });
    

    useEffect(() => {
        axios
            .get('http://localhost:3000/payments')
            .then((res) => {
                const expenses = res.data;

                const monthMap = new Map();

                expenses.forEach((expense) => {
                    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    //let FullDate = expense.date
                    let monthIndex =( new Date(expense.date).getMonth());
                    let monthName = monthNames[monthIndex];

                    const label = monthName;
                    const amount = parseFloat(expense.amount);

                    if (monthMap.has(label)) {
                        monthMap.set(label, monthMap.get(label) + amount);
                    } else {
                        monthMap.set(label, amount);
                    }
                });
                
                const sortedData = Array.from(monthMap.keys()).sort((a, b) => {
                    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    return monthOrder.indexOf(a) - monthOrder.indexOf(b);
                  });
                  
                  const labels = sortedData;
                  const data = sortedData.map(label => monthMap.get(label));
                  

                setExpenseData({
                    labels: labels,
                    datasets: [{
                        data: data,
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
                        borderColor: 'black',
                        borderWidth: 1,
                    }]
                });
            })
            .catch((error) => {
                console.error('Error fetching payments:', error);
            });
    }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

    const   options=  {
        plugins: {
          legend: {
            display: false
          }
        }
      };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ alignItems: 'center', width: '600px', height: '600px', padding: '20px' }}>
                    <h1 style={{ alignItems: 'center', justifyContent: 'center', padding: '20px' }}>Daily Expense</h1>
                    <Bar
                        data={expenseData}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
}
