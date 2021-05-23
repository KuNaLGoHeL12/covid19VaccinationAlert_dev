import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import States from './States';
import SweetAlert from 'react-bootstrap-sweetalert';
import { CircularProgress } from '@material-ui/core';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            radio: 'P',
            pincode: '',
            pinCodeRendered: true,
            state_id: '',
            district_id: '',
            alert: null,
            isLoading : false,
            ageRadio : 0,
            isEmailvalid : true
        }
    }
    handleNameChange = (event) => {
        //console.log("GGGGG ::: "+event.target.value);
        this.setState({
            name: event.target.value
        });
    }

    handlePincodeChange = (event) => {
        this.setState({
            pincode: event.target.value
        });
    }

    handleEmailChange = (event) => {
        //console.log("GGGGG ::: "+event.target.value);
        this.setState({
            email: event.target.value
        });
        
    }

    handleSubmit = (event) => {

        

        let formValues = {};

        var email = this.state.email;
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
            this.setState({
                isEmailvalid : false,
                email : ''
            });
            return;
          }

          this.setState({
            isLoading : true,
            isEmailvalid : true
        })

        if (this.state.radio === 'P') {
            formValues = {
                username: this.state.name,
                email_id: this.state.email,
                search_based_on: this.state.radio,
                search_value: this.state.pincode,
                age_group : this.state.ageRadio
            }
            //console.log(formValues);
        } else {
            formValues = {
                username: this.state.name,
                email_id: this.state.email,
                search_based_on: this.state.radio,
                search_value: this.state.district_id,
                age_group : this.state.ageRadio
            }
            //console.log(formValues);
        }
        
        formValues = JSON.stringify(formValues); 

        console.log("converted data : "+formValues);

       // const username = process.env.REACT_APP_API_USERNAME;
       // const password = process.env.REACT_APP_API_PASSWORD;
        //console.log(username);
        //console.log(password);
        let requestOptions = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : formValues
        };

        //console.log("Starting to call API");

        
        
        let Success_msg = "You should start receiving the covid19 Vaccination Alert on your registered E-mail in 30 mins, if slots are available.";

        let error_msg = "Some error occurred. Please try after sometime or correct the entered details and then try again.";

        let already_subscribed_msg = "You have already subscribed. Please don't overload the application with already subscribed E-mail Id";

     /*   fetch(process.env.REACT_APP_API_HOST+"/rest/alert/subscribe/",requestOptions).then((response) => {
                return response.json();
            }).then(data => {
                //console.log("KKG : ");
                //console.log(data);
                let code = data.responseCode;
                if(code === 200){
                    this.setState({
                        alert: (<SweetAlert
                            success
                            title="Subscribed Successfully"
                            onConfirm={this.hideAlertCustom}
                        >
                            { Success_msg }
                        </SweetAlert>),
                        isLoading : false
                    });
                }else if(code === 502){
                    this.setState({
                        alert: (<SweetAlert
                            warning
                            title="Subscription Failed"
                            onConfirm={this.hideWarningAlert}
                        >
                            { already_subscribed_msg }
                        </SweetAlert>),
                        isLoading : false
                    });
                }else {
                    this.setState({
                        alert: (<SweetAlert
                            error
                            title="Subscription Failed"
                            onConfirm={this.hideErrorAlert}
                        >
                            { error_msg }
                        </SweetAlert>),
                        isLoading : false
                    });
                }

            }).catch(error => {
                //console.log("errro : "+error);
                //console.log("typeof : "+typeof error);
                //console.log("KKK : "+String(error));

                this.setState({
                    alert: (<SweetAlert
                        error
                        title="Subscription Failed"
                        onConfirm={this.hideErrorAlert}
                    >
                        {String(error)}
                    </SweetAlert>),
                    isLoading : false
                });
            });
            */
            event.preventDefault();

        
    }

    hideAlertCustom = (event) => {
        //console.log("Inside Hide Alert");
        window.location.reload(false); //After 1 second, set render to true
        
    }

    hideWarningAlert = (event) => {
        window.location.reload(false); //After 1 second, set render to true
    }

    hideErrorAlert = (event) => {
        this.setState({
            alert : null
        });
    }

    districtRadioClicked = (event) => {
        //("kunal");
        this.setState({
            radio: 'D',
            pinCodeRendered: false,
            pincode: ''
        });
    }

    pincodeRadioClicked = (event) => {
        //console.log("kunal123 : " + event.target.checked);
        this.setState({
            radio: 'P',
            pinCodeRendered: true,
            state_id: '',
            district_id: ''
        });
    }

    ageGroupBothClicked = (event) => {
        this.setState({
            ageRadio : 0
        });
    }
    ageGroup45Clicked = (event) => {
        this.setState({
            ageRadio : 45
        });
    }
    ageGroup18Clicked = (event) => {
        this.setState({
            ageRadio : 18
        });
    }
    handleStateCallback = (childData) => {
        //console.log("Inside Parent for State change : " + childData);
        this.setState({
            state_id: childData
        })
    }


    handleDistrictCallback = (childData) => {
        //console.log("Inside Parent For District CHange : " + childData);
        this.setState({ district_id: childData });
    }
    render() {
        const p_rendered = this.state.pinCodeRendered;
        //const d_rendered = !p_rendered && this.state.state_id !== ''; 
        const submit_disabled = this.state.name === '' || this.state.email === '' || ((this.state.radio === 'P' && this.state.pincode === '') || (this.state.radio === 'D' && (this.state.state_id === '' || this.state.district_id === '')));

        return (
            <>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Register</h2>
                        <Form >
                            <Form.Group id="name" className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" required placeholder="Full Name" value={this.state.name} onChange={this.handleNameChange}></Form.Control>
                            </Form.Group>
                            <Form.Group id="email" className="mb-3">
                                <Form.Label>Email</Form.Label >
                                <Form.Control type="email" required isInvalid = {!this.state.isEmailvalid} placeholder="Email Address" value={this.state.email} onChange={this.handleEmailChange}></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please enter valid Email address.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group id="searchBy" className="mb-3">
                            <Form.Label>{'Search Criteria'}</Form.Label >
                                <Form.Check
                                    type="radio"
                                    checked={this.state.radio === 'P'}
                                    id="SearchByPincode"
                                    label={'Search By Pincode'}
                                    onChange={this.pincodeRadioClicked}
                                />
                                <Form.Check
                                    type="radio"
                                    id="SearchByPincode"
                                    label={'Search By District'}
                                    checked={this.state.radio === 'D'}
                                    onChange={this.districtRadioClicked}
                                />
                            </Form.Group>
                            {p_rendered && (
                                <Form.Group id="email" className="mb-3" >
                                    <Form.Label>Pincode</Form.Label>
                                    <Form.Control type="number" required placeholder="Area Pincode" value={this.state.pincode} onChange={this.handlePincodeChange} ></Form.Control>
                                </Form.Group>
                            )}
                            {!p_rendered && (
                                <States parentCallbackForState={this.handleStateCallback} parentCallbackForDistrict={this.handleDistrictCallback}></States>
                            )}
                            {/* {d_rendered && (
                            <Districts parentCallbackForDistrict = {this.handleDistrictCallback} state_id = {this.state.state_id}></Districts>
                         )} */}
                            <Form.Group id="ageGroup" className="mb-3">
                            <Form.Label>{'Age Group'}</Form.Label >
                                <Form.Check
                                    type="radio"
                                    checked={this.state.ageRadio === 18}
                                    id="ageGroup1"
                                    label={'18-45 years'}
                                    onChange={this.ageGroup18Clicked}
                                />
                                <Form.Check
                                    type="radio"
                                    id="ageGroup1"
                                    label={'45+ years'}
                                    checked={this.state.ageRadio === 45}
                                    onChange={this.ageGroup45Clicked}
                                />
                                <Form.Check
                                    type="radio"
                                    id="ageGroup1"
                                    label={'Both'}
                                    checked={this.state.ageRadio === 0}
                                    onChange={this.ageGroupBothClicked}
                                />
                            </Form.Group>
                            <br></br>
                            <Button className="w-100 btn btn-success" type="submit" disabled={submit_disabled} onClick={this.handleSubmit}>Subscribe { this.state.isLoading && (<CircularProgress size={15} color="inherit"></CircularProgress>)} </Button>
                        </Form>
                    </Card.Body>
                </Card>
                {this.state.alert}
            </>
        );
    }
}


export default Register;
