import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import {
    useParams
} from "react-router-dom";
import { Form, FormControl, Container, Row, Col, Button } from 'react-bootstrap';
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";
import Footer from '../Footer';


function handleUnsubscribe(param) {
    console.log("Inside Unsubscribe Handler with param : " + JSON.stringify(param));

    let requestOptions = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        mode : 'cors'
    };

    if(param.isEmail){
        fetch("https://covaccine-tracker.herokuapp.com/rest/alert/unsubscribe/"+param.parameter,requestOptions)
    .then((response) => {
        return response.json();
    }).then((data) => {
        let code = data.responseCode;
        if(code === 200){
            console.log("Unsibscrinbed Successfully")
        }else{
            console.log("Error occurred during Unsibscrinbe")
        }
    });
    }else{
        fetch("https://covaccine-tracker.herokuapp.com/rest/alert/unsubscribe/schedule/"+param.parameter,requestOptions)
    .then((response) => {
        return response.json();
    }).then((data) => {
        let code = data.responseCode;
        if(code === 200){
            console.log("Unsibscrinbed Successfully")
        }else{
            console.log("Error occurred during Unsibscrinbe")
        }
    });
    }

    
}

function Unsubscribe() {
    let { id } = useParams();

   // Encode the String
let decodeString = atob(id);
//console.log(encodedStringBtoA);

//decodeString : "a@console.comStayAwayHacker"



let tmp = btoa("a@.comStayAwayHacker");
console.log("wp : "+tmp);

//Email String : U3RheUF3YXlIYWNrZXJra2cxNzZAZ21haWwuY29t
//Schedule String : U3RheUF3YXlIYWNrZXI1



let tooltipMessage = "";

let parameter = decodeString.substring(0,decodeString.length - 14);
console.log("KKG :" + parameter);
let isEmail = parameter.includes("@");
let email = "";
let district = "";
let isPincode = false;
let pincode = "";
let district_name = "";
let param = {
    "parameter" : parameter,
    "isEmail" : isEmail
}

if(isEmail){
    tooltipMessage = "On Clicking on Unsubscribe button, this Email will be marked as Unsubscribe and you won't receive the Covid19 Vaccine Alert in future.";
    email = parameter;
}else{
    tooltipMessage = "On Clicking on Unsubscribe button, this District Alert will be marked as Unsubscribe and you won't receive the Covid19 Vaccine Alert in future.";
    
    let requestOptions = {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        mode : 'cors'
    }
    fetch("http://localhost:8080/cowin-tracker/rest/alert/schedules/"+param.parameter,requestOptions)
    .then((response) => {
        return response.json();
    })
    .then(data => {
        email = data.email_id;

    if(data.search_based_on === 'P'){
        isPincode = true;
        pincode = data.search_value;
    }else{
        isPincode = false;

        let requestOptions2 = {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            },
            mode : 'cors'
        }
        fetch("http://localhost:8080/cowin-tracker/rest/data/district_name/"+data.search_value,requestOptions2)
        .then((response) => {
            return response.json();
        })
        .then(data => {
                district_name = data.district_name;
        })
    
        // let tmpResponse2 = {
        //     "district_id": 775,
        //     "district_name": "rajkot corporation",
        //     "state_id": 11
        // }
        // district_name = tmpResponse2.district_name;
    }

    console.log("ABCD : "+pincode+" "+district_name+" "+isEmail+" "+isPincode);

    })
    // let tmpResponse = {
    //     "schedule_id": 5,
    //     "username": "test",
    //     "email_id": "test@gmail.com",
    //     "search_based_on": "D",
    //     "search_value": "5",
    //     "min_age_limit": 0,
    //     "created_on": "May 7, 2021",
    //     "is_active": false
    // }
    // email = tmpResponse.email_id;

    // if(tmpResponse.search_based_on === 'P'){
    //     isPincode = true;
    //     pincode = tmpResponse.search_value;
    // }else{
    //     isPincode = false;
    //     let tmpResponse2 = {
    //         "district_id": 775,
    //         "district_name": "rajkot corporation",
    //         "state_id": 11
    //     }
    //     district_name = tmpResponse2.district_name;
    // }

    // console.log("ABCD : "+pincode+" "+district_name+" "+isEmail+" "+isPincode);



}

    if(isEmail){
        return (
            <>
            <h2 align="center" className="mb-4 mt-4">Covid19 Vaccination Alert</h2>
                <Container className="d-xl-flex align-items-center justify-content-center mb-200">
                    <div className="w-100" style={{ maxWidth: "500px" }}>
                        <Row>
                            <Col md="8">
                                <Form>
                                    <FormControl
                                        readOnly
                                        type="text"
                                        value={email}
                                    />
                                </Form>
                            </Col>
                            <Col md="4">
                            <div data-tip={tooltipMessage} data-for='toolTip1' data-place='top'><Button variant="danger" onClick={() => handleUnsubscribe(param)}><MDBIcon icon="info-circle" size="sm" className="pr-3 align-items-center justify-content-center" />  Unsubscribe</Button></div>
                            <ReactTooltip id="toolTip1" />
                            </Col>
                            {/* <Col md="1">
                            <p><MDBIcon icon="info-circle" size="2x" className="pr-3 align-items-center justify-content-center" /></p>
                            </Col> */}
                        </Row>
                    </div>
                    
                </Container>
                <Footer></Footer>
            </>
        );
    }else{
        return (
            <>
            <h2 align="center" className="mb-4 mt-4">Covid19 Vaccination Alert</h2>
                <Container className="d-xl-flex align-items-center justify-content-center mb-200">
                    <div className="w-100" style={{ maxWidth: "500px" }}>
                        <Row>
                            <Col md="8">
                                <Form>
                                    {(isPincode && (<FormControl
                                        readOnly
                                        type="text"
                                        value={pincode}
                                    />))}

                                    {(!isPincode && (<FormControl
                                        readOnly
                                        type="text"
                                        value={district_name}
                                    />))}
                                    
                                </Form>
                            </Col>
                            <Col md="4">
                            <div data-tip={tooltipMessage} data-for='toolTip1' data-place='top'><Button variant="danger" onClick={() => handleUnsubscribe(parameter)}><MDBIcon icon="info-circle" size="sm" className="pr-3 align-items-center justify-content-center" />  Unsubscribe</Button></div>
                            <ReactTooltip id="toolTip1" />
                            </Col>
                            {/* <Col md="1">
                            <p><MDBIcon icon="info-circle" size="2x" className="pr-3 align-items-center justify-content-center" /></p>
                            </Col> */}
                        </Row>
                    </div>
                    
                </Container>
                <Footer></Footer>
            </>
        );
    }
    
}

export default Unsubscribe;