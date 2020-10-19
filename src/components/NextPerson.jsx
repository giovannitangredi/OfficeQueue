
import React from 'react';

import ReactBootstrap,{Button,Col, Row} from 'react-bootstrap'

class NextPerson extends React.Component{
constructor (props){
super(props);
let {currentNumber,currentType,next_handler}=props;
}


handleNext=(evt)=>{
    evt.preventDefault();
    if(this.props.next_handler!=undefined && this.props.next_handler)
    this.props.next_handler();
}

render(){
    return(
        <div className="d-flex w-100 justify-content-between">
        <div className="container">
            <Row>
           
            <label className="col-lg-12">Current Number</label>
        <input name="digitshow" type="text" className="alert alert-info digit7style col-lg-12" value={this.props.currentNumber} disabled />
        </Row> 
        <Row>
        <label  className="col-lg-12">Current Type</label>
        <input name="Typeshow" type="text" className="alert alert-info col-lg-12" value={this.props.currentType}  disabled />

        
      </Row>
        <Row>
       
        <Col> </Col>
        <Col>
            <Button variant="primary" type="Button" className="btn btn-block" onClick={(event) => this.handleNext(event)}>Next</Button>
       </Col> 
       <Col> </Col>
          
     
        </Row> 
        </div> 
        </div>


)}
}

export default NextPerson;