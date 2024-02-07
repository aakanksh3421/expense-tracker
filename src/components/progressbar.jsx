import React from 'react';
import { CDBProgress, CDBContainer } from "cdbreact";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { Axios } from 'axios';

function Progressbar({ budget , expense }) {
   // let budget = 100000;
    let percentage;
    if (budget !== 0) {
        percentage = (expense / budget) * 100;
    } else {
        percentage = 0;
    }

    return (
        
        <div>
            <Container >
       <Row className="justify-content-md-centre">
        <Col xs lg="2">
        Expenditure :
        </Col>
        <Col md="auto"> <CDBContainer>
                <CDBProgress value={percentage} text={`${percentage}%`} />
            </CDBContainer></Col>
        <Col xs lg="2">
          <Link to="/Chart" className="btn btn-primary ms-3">
            Chart
          </Link>
        </Col>
      </Row>
      </Container>
        </div>
    );
}

export default Progressbar;
