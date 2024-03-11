import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Home.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Add_bud from "./Add_bud";
import axios from "axios";
import Add_expense from "./Add_expense";
import Spend_history from "./Spend_history";
import { Link } from "react-router-dom";
import Progressbar from "./progressbar";


export default function Home() {
  
  // const [Budget, setBudget] = useState(() => 0)
  const [Expense, setExpense] = useState(() => 0)
  const [CurrExp , Setexp] = useState(()=>0);

  const handleBudgetChange = () => {

    console.log("Budget changed!");
  };

  useEffect(() => {
    
    axios.get("http://localhost:3000/payments")
      .then((response) => {
        const expenses = response.data;
        let total = 0;

        for (let i = 0; i < expenses.length; i++) {
          const expense = expenses[i];
          const amount = parseFloat(expense.amount);
        
          if (!isNaN(amount)) {
            total += amount;
          }
        }
        Setexp(total);
      })
      .catch((err) => console.log(err));
  }, []);



  return (
    <div className="h-100">
      <div  className=" grey d-flex-coloumn mb-3  align-self-center text-center  jsutify-md-centre  ">
        <div>
          <div className=" setYellow  d-fex-coloumn col-sm-10 card  offset-sm-1  ;">
            <div className="card-body mt-2 pt-0 ">
              <h2 className="card-title">Expense Tracking System</h2>
              <h6 className="card-subtitle mb-2 text-muted">Manage Your Expenses and Save Wisely</h6>
            </div>
            <div className="row">
              <div className="col-sm-5 offset-sm-1">
             
        
              <Add_bud/>
              </div>
              <div class="col-sm-5">
              <Add_expense/>
              </div>
              <div className=" pt-2">
              <Progressbar expense = {CurrExp}/>
                </div>
            </div>
            <div className="spend">
            <Spend_history/>
            
            </div>
           
          </div>
        </div>
      </div>

   </div>


  );

}