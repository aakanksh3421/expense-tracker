import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { currencyFormat } from './util';
import axios from 'axios';

import { Link } from "react-router-dom";
import { ReactDOM } from 'react';
import { CDBProgress, CDBContainer } from "cdbreact";
import Progressbar from './progressbar'; 

function Add_expense() {

  const [show, setShow] = useState(false);
  const [Expense, setExpense] = useState(() => 0)
  const [TempExp, setTempExp] =
    useState({
      reason: '',
      category: '',
      amount: '',
      date: '',

    });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  useEffect(() => {
    
    axios.get("https://dataforexpensetracker.onrender.com/payments")
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
        setExpense(total);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSaveExp = (e) => {
    e.preventDefault();

    axios
      .post("https://dataforexpensetracker.onrender.com/payments", TempExp)
      .then(() => {
        window.location.reload();


        handleClose();
      })
      .catch((err) => console.log(err));
  };



  return (
    <>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title ">TOTAL EXPENSE</h5>
          <p class="card-text">{currencyFormat(Expense)}</p>
           <progressbar/>
          <Button variant="primary" onClick={handleShow}>
            Add New Expense
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Expense </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Cause Of Spending </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cause of spending"
                autoComplete='off'
                value={TempExp.reason}
                onChange={(e) => setTempExp({ ...TempExp, reason: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Category  </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                autoComplete='off'
                value={TempExp.category}
                onChange={(e) => setTempExp({ ...TempExp, category: e.target.value })}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="causespend"
            >
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="dd-mm-yyyy "
                value={TempExp.date}
                
                onChange={(e) => setTempExp({ ...TempExp, date: e.target.value })} />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="causespend"
            >
              <Form.Label>Input Amount</Form.Label>
              <Form.Control
                type="0-9"
                autoComplete='off'
                placeholder="Enter amount "
                value={TempExp.amount}
                onChange={(e) => setTempExp({ ...TempExp, amount: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveExp}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add_expense;