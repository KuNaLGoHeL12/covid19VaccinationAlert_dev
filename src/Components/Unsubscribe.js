import React, { Component } from 'react';
import { Form, FormControl, Container, Row, Col, Button } from 'react-bootstrap';
import {  MDBIcon } from "mdbreact";
import Footer from './Footer';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Tooltip } from '@material-ui/core';


class Unsubscribe extends Component{

    constructor(props){
        super(props);
        this.state = {
            alert : null,
            isEmail : null,
            email : null,
            isPincode : null,
            pincode : null,
            district_name : null,
            tooltipMessage : null,
            param : null,
            isLoading : true
        }
    }

    hideAlertCustom = (event) => {
        //console.log("Inside Hide Alert");
        window.location.assign(process.env.REACT_APP_HOST);
        
    }
    hideAlertCustomError = (event) => {
        this.setState({
            alert : null
        });
    }

    handleUnsubscribe = () => {
        //console.log("Inside Unsubscribe Handler with param : " + JSON.stringify(this.state.param));

    let requestOptions = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        mode : 'cors'
    };

    if(this.state.param.isEmail){
        fetch(process.env.REACT_APP_API_HOST+"/rest/alert/unsubscribe/"+this.state.param.parameter,requestOptions)
    .then((response) => {
        return response.json();
    }).then((data) => {
        let code = data.responseCode;
        if(code === 200){
            //console.log("Unsibscrinbed Successfully")
            this.setState({
                alert: (<SweetAlert
                    success
                    title="Unsubscribed Successfully"
                    onConfirm={this.hideAlertCustom}
                >
                    Unsubscribed!!!! Thanks for using this tool. Hope you have got your vaccination slot.
                </SweetAlert>)
            });
        }else{
            //console.log("Error occurred during Unsibscrinbe")
            this.setState({
                alert: (<SweetAlert
                    danger
                    title="Some error occurred"
                    onConfirm={this.hideAlertCustomError}
                >
                    Some error occurred while unsubscribe. Please try after sometime. 
                </SweetAlert>)
            });
        }
    }).catch(error => {
        this.setState({
            alert: (<SweetAlert
                danger
                title="Some error occurred"
                onConfirm={this.hideAlertCustomError}
            >
                Some error occurred while unsubscribe. Please try after sometime. 
            </SweetAlert>)
        });
    });
    }else{
        fetch(process.env.REACT_APP_API_HOST+"/rest/alert/unsubscribe/schedule/"+this.state.param.parameter,requestOptions)
    .then((response) => {
        return response.json();
    }).then((data) => {
        let code = data.responseCode;
        if(code === 200){
            //console.log("Unsibscrinbed Successfully")
            this.setState({
                alert: (<SweetAlert
                    success
                    title="Unsubscribed Successfully"
                    onConfirm={this.hideAlertCustom}
                >
                    Unsubscribed!!!! Thanks for using this tool. Hope you have got your vaccination slot.
                </SweetAlert>)
            });
        }else{
            //console.log("Error occurred during Unsibscrinbe")
            this.setState({
                alert: (<SweetAlert
                    danger
                    title="Some error occurred"
                    onConfirm={this.hideAlertCustomError}
                >
                    Some error occurred while unsubscribe. Please try after sometime. 
                </SweetAlert>)
            });
        }
    }).catch(error => {
        this.setState({
            alert: (<SweetAlert
                danger
                title="Some error occurred"
                onConfirm={this.hideAlertCustomError}
            >
                Some error occurred while unsubscribe. Please try after sometime. 
            </SweetAlert>)
        });
    });
    }

    }

 async  componentDidMount() {
        let { id } = this.props.match.params;

        // Encode the String
     let decodeString = atob(id);
     //console.log(encodedStringBtoA);
     
     //decodeString : "a@console.comStayAwayHacker"
     
     
     
     let tmp = btoa("25StayAwayHacker");
     console.log("wp : "+tmp);
     
     //Email String : U3RheUF3YXlIYWNrZXJra2cxNzZAZ21haWwuY29t
     //Schedule String : U3RheUF3YXlIYWNrZXI1
     
     
     
     let v_tooltipMessage = "";
     
     let parameter = decodeString.substring(0,decodeString.length - 14);
     //console.log("KKG :" + parameter);
     let v_isEmail = parameter.includes("@");
     let v_email = "";
     let v_district = "";
     let v_isPincode = false;
     let v_pincode = "";
     let v_district_name = "";
     let v_param = {
         "parameter" : parameter,
         "isEmail" : v_isEmail
     }
     
     if(v_isEmail){
         //console.log("Inside First IF")
         v_tooltipMessage = "On Clicking on Unsubscribe button, this Email will be marked as Unsubscribe and you won't receive the Covid19 Vaccine Alert in future.";
         v_email = parameter;

         this.setState({
             isEmail : true,
             email : v_email,
             tooltipMessage : v_tooltipMessage,
             param : v_param,
             isLoading : false
             
         });
         //console.log("ABCD2 : "+this.state.email+" "+this.state.tooltipMessage);
     }else{
         //console.log("Come here!!")
         v_tooltipMessage = "On Clicking on Unsubscribe button, this District Alert will be marked as Unsubscribe and you won't receive the Covid19 Vaccine Alert in future.";
         
         let requestOptions = {
             method : 'GET',
             mode : 'cors'
         }
         await fetch(process.env.REACT_APP_API_HOST+"/rest/alert/schedules/"+v_param.parameter,requestOptions)
         .then((response) => {
             return response.json();
         })
         .then((data) => {
             v_email = data.email_id;
            //console.log("GGG : "+JSON.stringify(data))
         if(data.search_based_on === 'P'){
            // console.log("Inside IF block of pincide")
             v_isPincode = true;
             v_pincode = data.search_value;

             this.setState({
                isEmail : v_isEmail,
                email : v_email,
                isPincode : v_isPincode,
                pincode : v_pincode,
                district_name : v_district_name,
                tooltipMessage : v_tooltipMessage,
                param : v_param,
                isLoading : false
             });
             return;
         }else{
             //console.log("Inside destrict else : ")
             v_isPincode = false;
     
             let requestOptions2 = {
                 method : 'GET',
                 mode : 'cors'
             }
             return fetch(process.env.REACT_APP_API_HOST+"/rest/data/district_name/"+data.search_value,requestOptions2);
         }

         

         
         
     
         }).then((response) => {
             
             //console.log("Kunal12")
             //console.log(JSON.stringify(response))
            return response.json();
        })
        .then((data) => {
                v_district_name = data.district_name;
                //console.log("Inside District")
                this.setState({
                   isEmail : v_isEmail,
                   email : v_email,
                   isPincode : v_isPincode,
                   pincode : v_pincode,
                   district_name : v_district_name,
                   tooltipMessage : v_tooltipMessage,
                   param : v_param,
                   isLoading : false
                });
       
        })
        .catch(error => {
            //console.log("ERR"+error)
        });
         
    }

}

    render(){


        //console.log("Inside Render : "+JSON.stringify(this.state))

        if(!this.state.isLoading){


        if(this.state.isEmail === true){
            //console.log("HP")
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
                                            value={this.state.email}
                                        />
                                    </Form>
                                </Col>
                                <Col md="4">
                                <Tooltip title={this.state.tooltipMessage}>
                                
                                <Button variant="danger" onClick={this.handleUnsubscribe}><MDBIcon icon="info-circle" size="sm" className="pr-3 align-items-center justify-content-center" />  Unsubscribe</Button>
                                
                                </Tooltip>
                                {/* <div data-tip={this.state.tooltipMessage} data-for='toolTip1' data-place='top'><Button variant="danger" onClick={this.handleUnsubscribe}><MDBIcon icon="info-circle" size="sm" className="pr-3 align-items-center justify-content-center" />  Unsubscribe</Button></div>
                                <ReactTooltip id="toolTip1" /> */}
                                </Col>
                                {/* <Col md="1">
                                <p><MDBIcon icon="info-circle" size="2x" className="pr-3 align-items-center justify-content-center" /></p>
                                </Col> */}
                            </Row>
                        </div>
                        
                    </Container>
                    {this.state.alert}
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
                                        {(this.state.isPincode && (<FormControl
                                            readOnly
                                            type="text"
                                            value={this.state.pincode}
                                        />))}
    
                                        {(!this.state.isPincode && (<FormControl
                                            readOnly
                                            type="text"
                                            value={this.state.district_name}
                                        />))}
                                        
                                    </Form>
                                </Col>
                                <Col md="4">
                                <Tooltip title={this.state.tooltipMessage}>
                                
                                <Button variant="danger" onClick={this.handleUnsubscribe}><MDBIcon icon="info-circle" size="sm" className="pr-3 align-items-center justify-content-center" />  Unsubscribe</Button>
                                
                                </Tooltip>
                                {/* <div data-tip={this.state.tooltipMessage} data-for='toolTip1' data-place='top'><Button variant="danger" onClick={this.handleUnsubscribe}><MDBIcon icon="info-circle" size="sm" className="pr-3 align-items-center justify-content-center" />  Unsubscribe</Button></div>
                                <ReactTooltip id="toolTip1" /> */}
                                </Col>
                                {/* <Col md="1">
                                <p><MDBIcon icon="info-circle" size="2x" className="pr-3 align-items-center justify-content-center" /></p>
                                </Col> */}
                            </Row>
                        </div>
                    </Container>
                    {this.state.alert}
                    <Footer></Footer>
                </>
            );
    }
}else{
    return(
        <div class="my-auto text-center"><p style={{color : "green", 'font-size' : "30px"}}>Loading....</p></div>
    );
}
}
}

export default Unsubscribe;

