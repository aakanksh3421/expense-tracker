import { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { currencyFormat } from "./util";
import { Link } from "react-router-dom";
import Progressbar from './progressbar';

function Add_bud() {
  const [show, setShow] = useState(false);
  const [budget, setBudget] = useState(0);
  const [TempBudget,setTempBudget] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveBudget = () => {
    setBudget(TempBudget);

    localStorage.setItem('budget', TempBudget.toString());
     handleClose();
  };

  useEffect(() => {
    const storedBudget = localStorage.getItem('budget');
    if (storedBudget) {
      setBudget(parseFloat(storedBudget));
      
    }
   
  }, []);


  return (
    <>
      <div className="card">
      <div className="card-body">
          <h5 className="card-title">BUDGET</h5>
          <p className="card-text">{currencyFormat(budget)}</p>

          <Button variant="primary" onClick={handleShow}>
            Set Budget
          </Button>
          </div>
         </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='justify-centre'>
            <input
              type='0-9'
              className='form-control'
              placeholder='Enter new budget'
              value={TempBudget}
              onChange={(e) => setTempBudget(parseFloat(e.target.value) || 0)}
            />
          </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
           </Button>
           <Button variant="primary" onClick={handleSaveBudget}>
            Save Budget
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add_bud;
