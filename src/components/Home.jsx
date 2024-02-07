import React from "react";
import { useState } from "react";
import "./Home.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Add_bud from "./Add_bud";
import Add_expense from "./Add_expense";
import Spend_history from "./Spend_history";
import { Link } from "react-router-dom";


export default function Home() {
  
  // const [Budget, setBudget] = useState(() => 0)
  const [Expense, setExpense] = useState(() => 0)


  const handleBudgetChange = () => {

    console.log("Budget changed!");
  };

  


  return (
    <div>
      <div className="d-flex-coloumn mb-3 vh-100 align-self-center text-center  jsutify-md-centre bg-primary  ">

        <div>
          <div className=" d-fex-coloumn col-sm-10 card  offset-sm-1  ;">
            <div className="card-body mt-4 ">
              <h2 className="card-title">EXPENSE TRACKER</h2>
              <h6 className="card-subtitle mb-2 text-muted">keep track of your spending n save more!!!</h6>
            </div>
            <div className="row">
              <div className="col-sm-5 offset-sm-1">
             
        
              <Add_bud/>
              </div>
              <div class="col-sm-5">
              <Add_expense/>
              </div>
            </div>
            
             <Spend_history/>
            
          </div>
        </div>
      </div>

   </div>


  );

}