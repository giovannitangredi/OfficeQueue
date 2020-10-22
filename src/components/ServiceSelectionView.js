import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

function ServiceSelectionView() {
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState("");
  const [queueLength, setQueueLength] = useState(0);
  const [ticketIssued, setTicketIssued] = useState(false);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = () => {
    axios
      .get("http://localhost:4001/service/allservice")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the service list: ${error}`
        )
      );
  };

  const handleServiceSelection = (serviceID) => {
    setCurrentService(serviceID);
    axios
      .get("http://localhost:4001/tickets/filterticket", {
        params: {
          SID: serviceID,
          Status: "A",
        },
      })
      .then((response) => {
        setQueueLength(response.data.length);
      })
      .catch((error) =>
        console.error(`There was an error retrieving the ticket list: ${error}`)
      );
  };

  const handleGetTicket = () => {
    axios
      .post("http://localhost:4001/tickets/createticket", {
        SID: currentService,
        Status: "A",
      })
      .then((response) => {
        setTicketIssued(true);
      })
      .catch((error) =>
        console.error(`There was an error creating a new ticket: ${error}`)
      );
  };

  return (
    <>
      {ticketIssued && <Redirect to="/mainScreen" />}
      <Container>
        <Row>
          <h4 className="mx-auto mt-3 text-center p-2">Available services</h4>
        </Row>
        <Row>
          <Col
            sm={12}
            style={{ maxHeight: "60vh" }}
            className="mx-auto overflow-auto p-3"
          >
            <ListGroup variant="flush">
              {services.map((s) => (
                <ListGroup.Item
                  key={s.SID}
                  active={currentService === s.SID ? true : false}
                  onClick={() => handleServiceSelection(s.SID)}
                  action
                  className="rounded-pill mx-auto mt-3 shadow text-center w-75 p-4"
                >
                  {s.Type}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="d-flex flex-column justify-content-center">
            <div className="my-auto">
              {currentService !== "" ? (
                <>
                  <p className="mt-auto text-center">
                    <strong>People in queue: {queueLength}</strong>
                  </p>
                </>
              ) : (
                <p className="my-auto text-center">
                  Select a service to get more information
                </p>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Button
            onClick={handleGetTicket}
            disabled={currentService === "" ? true : false}
            className="my-2 mx-auto"
          >
            Get the ticket
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default ServiceSelectionView;
