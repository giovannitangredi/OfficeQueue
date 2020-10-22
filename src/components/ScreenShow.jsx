
import React, { useEffect, useState } from 'react'
import ReactBootstrap,{Button,Col, Row} from 'react-bootstrap'
import ScreenRow from './ScreenRow';
 const ScreenShow = (props) => {
   
     return (
        <table className="table">
        <thead>
          <tr>
            

            <th className="table-head-item">Ticket</th>

            <th className="table-head-item">Counter</th>

            <th className="table-head-item">Type</th>

            <th className="table-head-item">N. people</th>

            
          </tr>
        </thead>

        <tbody className="table-body">
          {props.tickets.length > 0 ? (
            props.tickets.map(  ticket=> (
              <ScreenRow
                key={ticket.TID}
                ticket={ticket}
                np= {props.numberPeople}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no tickets to show</td>
            </tr>
          )
        }
        </tbody>
    </table>
     )
   }
export default ScreenShow;  
/*class ScreenShow extends React.Component{
constructor (props){
super(props);

}

render(){
    return(
        <div className="d-flex w-10 justify-content-between">
        <div className="container">
        <Row>
        <label className="col-lg-12">Services{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}Current Number
        {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}Number of people in queue now</label>
        <input name="digitshow" type="text" className="alert alert-info digit7style col-lg-3" value="P" disabled />
        <input name="digitshow" type="text" className="alert alert-info digit7style col-lg-3" value="-" disabled />
        <input name="digitshow" type="text" className="alert alert-info digit7style col-lg-3" value="0" disabled />
        
        </Row>

      
       
        <Row>
        <input name="digitshow" type="text" className="alert alert-info digit7style col-lg-3" value="S" disabled />
        <input name="digitshow" type="text" className="alert alert-info digit7style col-lg-3" value="-" disabled />
        <input name="digitshow" type="text" className="alert alert-info digit7style col-lg-3" value="0" disabled />
        </Row> 

        <Row>
        <input name="digitshow" type="text" className="alert alert-info digit7style col-lg-3" value="M" disabled />
        <input name="digitshow" type="text" className="alert alert-info digit7style col-lg-3" value="-" disabled />
        <input name="digitshow" type="text" className="alert alert-info digit7style col-lg-3" value="0" disabled />
        </Row>
        
        </div> 
        </div>


)}
}

export default ScreenShow;*/