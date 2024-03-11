import React from 'react';
import { CDBProgress, CDBContainer } from "cdbreact";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { Axios } from 'axios';

function Progressbar({ expense }) {
    // let budget = 100000;
    let budget = localStorage.getItem('budget');
    let percentage;
    if (budget !== 0) {
        percentage = (expense / budget) * 100;
    } else {
        percentage = 0;
    }

    return ( 
         <div class="d-flex-coloumn col-sm-10 card offset-sm-1 mt-1">
          <div className="card">
      <div className="card-body ">
      <Container>
                        <Row className="align-items-center">
                            <Col xs={12} md="auto">
                                Expenditure :
                            </Col>
                            <Col xs={12} md={8}>
                                <CDBContainer>
                                    <CDBProgress value={percentage} text={`${percentage}%`} style={{ width: '100%' }} />
                                </CDBContainer>
                            </Col>
                            <Col xs={12} md="auto">
                                <Link to="/Chart" className="btn btn-primary ms-3">
                                    Chart
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
