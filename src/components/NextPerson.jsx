import React from "react";

import ReactBootstrap, { Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class NextPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentType: "Shipping",
      currentSID: 1,
      currentCID: 1,
      currentTID: 0,
    };
    this.getCurrentTicketID();
  }

  getCurrentTicketID=()=>{
console.log("currentCID="+this.state.currentCID);
    axios //call new customer
    .get("http://localhost:4001/tickets/nextperson", {
      params: {
        CID: this.state.currentCID,
      },
    })
    .then((response) => {
      let result = response.data.reduce((acc, er) =>   er.TID, 0);
      this.setState({ currentTID: result });
      console.log("TID="+this.state.currentTID+" SID="+this.state.currentSID+" CID="+this.state.currentCID);
     
    })
    .catch((error) =>
      console.error(`There was an error retrieving the ticket list: ${error}`)
    );
  }

  
  handleNext = (evt) => {
      if(evt)
    evt.preventDefault();
this.getCurrentTicketID();
      axios   //update ticket status and counter
            .post('http://localhost:4001/tickets/updateticket',
            {
                    TID: this.state.currentTID,
                    Status: 'C',
                    CID:this.state.currentCID, 
                    
                })
                .then(response => {
                    console.log("After TID="+this.state.currentTID+" SID="+this.state.currentSID+" CID="+this.state.currentCID);
                    
            })
            .catch(error => console.error(`There was an error retrieving the ticket list: ${error}`));

    //     this.setState({ currentNumber: this.state.currentSID , currentType:"Payment"});
  };
  onChangeText = (name,value) => {
   
   console.log(value);
    this.setState({ currentCID: value });
   

  };

  render() {
    return (
      <div className="d-flex w-100 justify-content-between">
        <div className="container">
          <Row>
            <label className="col-lg-12">Counter ID</label>
            <input
              name="Counterinput"
              type="number"
              className="alert alert-info digit7style col-lg-12"
              value={this.state.currentCID}
              onChange={(ev) => this.onChangeText(ev.target.name, ev.target.value)}
             
            />
          </Row>
          <Row>
            <label className="col-lg-12">Current Number</label>
            <input
              name="digitshow"
              type="text"
              className="alert alert-info digit7style col-lg-12"
              value={this.state.currentTID}
              disabled
            />
          </Row>
          <Row>
            <label className="col-lg-12">Current Type</label>
            <input
              name="Typeshow"
              type="text"
              className="alert alert-info col-lg-12"
              value={this.state.currentType}
              disabled
            />
          </Row>
          <Row>
            <Col> </Col>
            <Col>
              <Button
                variant="primary"
                type="Button"
                className="btn btn-block"
                onClick={(event) => this.handleNext(event)}
              >
                Next
              </Button>
            </Col>
            <Col> </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default NextPerson;
