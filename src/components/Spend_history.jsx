import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Progressbar from './progressbar'; 
 import "./Home.css"

export default function Spend_history() {
  const [data, setData] = useState([]);
  
  

  //const[Bud,Setbud]= useState(()=>0);
  useEffect(() => {
    axios
      .get('http://localhost:3000/payments')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));


  }, []);



  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Would you like to delete?');

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/payments/${id}`)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      
      <div className="d-flex-coloumn col-sm-10 card offset-sm-1 mt-2">
      <h2 className="sh">HISTORY OF EXPENSES</h2>
             <div className="card-body pt-0" style={{ height: '300px', overflowY: 'auto' }}>
          
        <h6 className="card-subtitle text-muted"></h6>
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-striped">
              <thead>
               
                <tr className='sticky-header' >
                  <th>ID</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Delete</th>
                </tr>
                
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    <td>{d.id}</td>
                    <td>{d.date}</td>
                    <td>{d.reason}</td>
                    <td>{d.category}</td>
                    <td>{d.amount}</td>
                    <td>
                      <button
                        onClick={(e) => handleDelete(d.id)}
                        className="btn btn-danger btn-sm"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
