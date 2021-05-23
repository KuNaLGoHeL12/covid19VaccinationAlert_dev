import React, { Component }from 'react';
import { Form } from 'react-bootstrap';


class Districts extends Component {

    constructor(props){
        super(props);

        this.state={
            districts : [],
            selectedDistrict : ''
        }
    }

    defaultState = { data: null, error: null };


    componentDidMount() {
        this.fetchDistricts();
      }

    //   componentDidUpdate(){
    //     this.fetchDistricts();
    // }

      fetchDistricts(){
        fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+this.props.state_id)
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
          console.log(error);
        });
      }

      handleDistrictChange = (event) =>{
        this.props.parentCallbackForDistrict(event.target.value);

        console.log("Inside District change state method "+event.target.value);

          this.setState({
            selectedDistrict : event.target.value
          });
          this.fetchDistricts();
      }


      render(){

        console.log("ABC : "+this.props.state_id);

        return(
            <>
            <Form.Group id="name" className="mb-3">
                <Form.Label>Select District</Form.Label>
                <Form.Control as="select" required value={this.state.selectedDistrict} onChange={this.handleDistrictChange}>
                {this.state.districts.map((state) => <option key={state.id} value={state.id}>{state.display}</option>)}
                </Form.Control>
            </Form.Group>
            </>
        );
    }
}

export default Districts;