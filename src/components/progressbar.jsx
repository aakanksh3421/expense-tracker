import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { CDBProgress, CDBContainer } from "cdbreact";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Progressbar({ expense }) {
    const[budget,setbudget] = useState(0);
   
    
    useEffect(() => {
    
    axios.get("https://dataforexpensetracker.onrender.com/budget")
          .then((response) => {
        setbudget(response.data.budget);
        })
      }, []);
  
    let percentage;

    if (budget !== 0) {
        percentage = (expense / budget) * 100;
        
    } else {
        percentage = 0;
    }
    let percentageRounded = percentage.toFixed(2);
    return ( 
         <div class="d-flex-coloumn col-sm-10 card offset-sm-1 mt-1">
          <div className="card">
      <div className="card-body ">
      <Container>
                        <Row className="align-items-center">
                            <Col xs={12} md="auto">
                               <h5 className=' pd-0 mb-0'>Expense :</h5> 
                            </Col>
                            <Col xs={12} md={8}>
                                <CDBContainer>
                                    <CDBProgress value={percentage} text={`${percentageRounded}%`} style={{ width: '100%' }} />
                                </CDBContainer>
                            </Col>
                            <Col xs={12} md="auto">
                                <Link to="/Chart" className="btn btn-primary ms-3">
                                     View Chart
                                </Link>
                            </Col>
                        </Row>
                    </Container>
        </div>
        </div>
        </div>
    );
}

export default Progressbar;
