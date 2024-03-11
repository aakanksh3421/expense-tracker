import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, Title} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TabPane from 'react-bootstrap/TabPane';
import Linechart from './Linechart';
import Bar_chart from './Barchart';


Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(0, 0, 156)';
Chart.defaults.plugins.legend.position = 'right';
Chart.defaults.plugins.legend.title.display = true;
Chart.defaults.plugins.legend.title.text = 'Labels';
Chart.defaults.plugins.legend.title.font = 'Helvetica Neue';


function CreateDoughnutData() {
  const [expenseData, setExpenseData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        'rgb(0, 197, 0)',
        'rgb(204, 223, 243)'
      ],
      borderWidth: 2,
      radius: '40%'
    }]
  });

  useEffect(() => {
    axios
      .get('https://dataforexpensetracker.onrender.com/payments')
      .then((res) => {
        const expenses = res.data;

        const categoriesMap = new Map();
        expenses.forEach((expense) => {
          const label = expense.category; // Expense category used as label
          const amount = parseFloat(expense.amount); 
          if (categoriesMap.has(label)) {
            categoriesMap.set(label, categoriesMap.get(label) + amount);
          } else {
            categoriesMap.set(label, amount);
          }
        });

        const categories = [...categoriesMap.keys()];
        const amount = [...categoriesMap.values()];
        

        const data = {
          labels: categories,
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
            borderWidth: 2,
            radius: '40%'
          }]
        };

        setExpenseData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    
    <div>
      
      <Tabs
    defaultActiveKey="Home"
    id="CreateDoughnutData"
    className="mb-3"
  >
    <TabPane eventKey="Home" title="Expense break down">
     
      <div className="d-flex justify-content-center align-items-center " style={{ height: '100vh' }}>
        <div className="border p-4 ">
          <div style={{ width: '600px', height: '500px' }} className='justify-content-evenly'>
            <div className=' justify-content-center align-items-center'>
              <h1 style={{ textAlign: 'center',  }}>Expense break down</h1>
            </div>
            <div className=' flex-grow-3 justify-content-center '>
            <Doughnut  
             //options= {{aspectRatio: 1}}
            data={expenseData} />
            </div>
          </div>
        </div>
      </div>
      </TabPane>
      <TabPane eventKey="profile" title="Daily expense">
      <Linechart/>
      </TabPane>
      <TabPane eventKey="second" title="Monthly expense">
      <Bar_chart/>
      </TabPane>
      </Tabs>
    </div>
  );
}

export default CreateDoughnutData;
