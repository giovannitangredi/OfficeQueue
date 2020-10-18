
import React from 'react';

import ReactBootstrap,{Button,Col, Row,Glyphicon} from 'react-bootstrap'

class NextPerson extends React.Component{
constructor (props){
super(props);

}

render(){
    return(
        <div className="d-flex w-100 justify-content-between">
        <div className="container">
            <Row>
           
            <label className="col-lg-12">Current Number</label>
        <input name="digitshow" type="text" className="alert alert-info digit7style col-lg-12" value="0" disabled />
        </Row> 
        <Row>
        <label  className="col-lg-12">Current Type</label>
        <input name="Typeshow" type="text" className="alert alert-info col-lg-12" value="Pay" disabled />

        
      </Row>
        <Row>
       
        <Col> </Col>
        <Col>
            <Button variant="primary" type="Button" className="btn btn-block">Next  <span className="glyphicon glyphicon-triangle-right"></span></Button>
       </Col> 
       <Col> </Col>
          
     
        </Row> 
        </div> 
        </div>


)}
}

export default NextPerson;