import React, { Component }from 'react';
import { Form } from 'react-bootstrap';



class States extends Component {

    constructor(props){
        super(props);

        this.state = {
            states : [],
            districts : [],
            selectedState : '',
            selectedDistrict: ''
        }
    }

    componentDidMount() {
        this.fetchStates();
      }

    fetchStates() {
        fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
          .then((response) => {
            return response.json();
          })
          .then(data => {
             //console.log(data);
           //console.log("KKG : ");
            let statesFromApi = data.states.map(team => {
                return {id: team.state_id, display: team.state_name}
              });
            //console.log(teamsFromApi);
            this.setState({
                states: [{id: '', display: ''}].concat(statesFromApi)
            });
          }).catch(error => {
            //console.log(error);
          });
    }

    fetchDistricts(state_id){
        //console.log("Inside fetchDistricts : "+state_id);

        fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+state_id)
        .then((response) => {
          return response.json();
        })
        .then(data => {
           // console.log(data);
         // console.log("KKG : ");
          let districtsFromApi = data.districts.map(team => {
              return {id: team.district_id, display: team.district_name}
            });
          //console.log(teamsFromApi);
          this.setState({
              districts: [{id: '', display: ''}].concat(districtsFromApi)
          });
        }).catch(error => {
          //console.log(error);
        });
      }

    handleStateChange = (event) =>{
          //console.log("Inside stateChange handler : "+event.target.value);
          this.props.parentCallbackForState(event.target.value);
        
             this.setState({
                selectedState : event.target.value,
                selectedDistrict : ''
        });
        this.fetchDistricts(event.target.value);
      }

    handleDistrictChange = (event) =>{
        this.props.parentCallbackForDistrict(event.target.value);

        //("Inside District change state method "+event.target.value);

          this.setState({
            selectedDistrict : event.target.value
          });
          //this.fetchDistricts();
      }

    handleDistrictCallback = (childData) => {
        this.setState({
            selectedDistrict : childData
        });
      }
    
    render(){
            const d_render = this.state.selectedState === '';
        return(
            <>
            <Form.Group id="name" className="mb-3">
                <Form.Label>Select State</Form.Label>
                <Form.Control as="select" required value={this.state.selectedState} onChange={this.handleStateChange}>
                {this.state.states.map((state) => <option key={state.id} value={state.id}>{state.display}</option>)}
                </Form.Control>
            </Form.Group>
            {(!d_render &&
            <Form.Group id="name" className="mb-3">
                <Form.Label>Select District</Form.Label>
                <Form.Control as="select" required value={this.state.selectedDistrict} onChange={this.handleDistrictChange}>
                {this.state.districts.map((state) => <option key={state.id} value={state.id}>{state.display}</option>)}
                </Form.Control>
            </Form.Group>
            )}
            {/* {(!d_render &&
            <Districts state_id = {this.state.selectedState} parentCallbackForDistrict = {this.handleDistrictCallback}></Districts>
            )} */}
            {/* <div>
            <select value={this.state.selectedState} onChange={this.handleStateChange}>
                {this.state.states.map((state) => <option key={state.id} value={state.id}>{state.display}</option>)}
            </select>
            </div>
            <div style={{color: 'red', marginTop: '5px'}}>
                {this.state.validationError}
            </div> */}
            </>
        );
    }
}

export default States;