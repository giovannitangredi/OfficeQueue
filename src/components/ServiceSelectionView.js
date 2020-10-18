import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ListGroup, Container, Row, Col } from 'react-bootstrap';
import Api from '../api/Api';
import moment from 'moment';

function ServiceSelectionView() {
    const [services, setServices] = useState([]);
    const [currentService, setCurrentService] = useState('');
    const [queueLength, setQueueLength] = useState(0);
    const [waitingTime, setWaitingTime] = useState(0);

    useEffect(()=>{
        Api.getServices()
            .then((availableServices) => {
                setServices(availableServices);
            });
    }, []);

    const handleServiceSelection = (serviceID) => {
        setCurrentService(serviceID);
        Api.getServiceInfo(serviceID)
            .then((service)=>{
                setQueueLength(service.queueLength);
                setWaitingTime(service.waitingTime);
            });
    }

    return (
        <Container>
            <Row>
                <h4 className='mx-auto mt-3 text-center p-2'>Available services</h4>
            </Row>
            <Row >
                <Col sm={12} lg={6} style={{ maxHeight: '60vh' }} className='overflow-auto p-3'>
                    
                    <ListGroup variant="flush">
                        {
                            services.map(s =>
                                <ListGroup.Item active={currentService === s.id ? true : false} onClick={()=>handleServiceSelection(s.id)} action className='rounded-pill mx-auto mt-3 shadow text-center w-75 p-4'> 
                                    {s.type} 
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                    
                </Col>
                <Col sm={12} lg={6} className="d-flex flex-column justify-content-center">
                    {
                        currentService !== '' ?
                        <div>
                            <p className="mt-auto text-center"><strong>People in queue: {queueLength}</strong></p>
                            <p className="mb-auto text-center"><strong>Estimated waiting time: {moment.utc(moment.duration(waitingTime, 'minutes').asMilliseconds()).format("H[h] m[m]")}</strong></p>
                        </div>
                        :
                            <p className="my-auto text-center">Select a service to get more information</p>
                    }
                    
                </Col>
            </Row>
            <Row className='fixed-bottom'>
                <Button disabled={currentService === '' ? true : false} className="my-2 mx-auto">
                    Get the ticket
                </Button>
            </Row>
        </Container>
    );
}

export default ServiceSelectionView;