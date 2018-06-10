import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Car from './components/car';
import SearchForm from './components/search-form';
import Nav from './components/nav';
import './App.css';

class App extends Component {
  constructor(props) {
    super();
    this.inputRef = React.createRef();
    this.state = {
      cars: [],
      perPage: 0,
      totalCount: 0,
      location: "london",
      locationValue: "",
      vehicleMake: {},
      transmission: {},
      year: {},
      fuel: {},
      carType: {},
      bodyType: {}
    }

    // this.handleChange = this.handleChange.bind(this);
    // this.selectVehicleMake = this.selectVehicleMake.bind(this);
    // this.selectGearBox = this.selectGearBox.bind(this);
  }

  componentDidMount() {
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", location: "london"}),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data.metadata.aggregations.vehicle_make)
      this.setState({
        cars: data.data,
        totalCount: data.metadata.total_count,
        perPage: data.metadata.per_page,
        vehicleMake: data.metadata.aggregations.vehicle_make,
        transmission: data.metadata.aggregations.transmission,
        year: data.metadata.aggregations.year,
        fuel: data.metadata.aggregations.fuel,
        carType: data.metadata.aggregations.tags,
        bodyType: data.metadata.aggregations.body_information
      })
    })
  }

  handleChange = (event) => {

    this.setState({
      locationValue: event.target.value
    })
  }

  selectVehicleMake = (event) => {
    event.preventDefault();
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", vehicle_make: event.target.value}),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        cars: data.data,
        transmission: data.metadata.aggregations.transmission,
        year: data.metadata.aggregations.year,
        fuel: data.metadata.aggregations.fuel,
        carType: data.metadata.aggregations.tags,
        bodyType: data.metadata.aggregations.body_information,
        totalCount: data.metadata.total_count,
        // perPage: data.metadata.per_page,
        // location: locationInput,
        // vehicleMake: vehicleMakeValue
      })
    })
  }

  selectGearBox = (event) => {
    event.preventDefault();
    console.log(event.target.value)
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", transmission: event.target.value }),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        cars: data.data,
        year: data.metadata.aggregations.year,
        fuel: data.metadata.aggregations.fuel,
        carType: data.metadata.aggregations.tags,
        bodyType: data.metadata.aggregations.body_information,
        totalCount: data.metadata.total_count,
        vehicleMake: data.metadata.aggregations.vehicle_make,
        // perPage: data.metadata.per_page,
        // location: locationInput,
        // vehicleMake: vehicleMakeValue
      })
    })
  }

  // renderCars() {
  //   this.state.vehicleMake.forEach(function(car){
  //
  //     return <li>{car}</li>
  //   })
  // }

  render() {
    return (
      <div className="wrapper">
        <Nav/>
        <div className="container">
          <div className="search">
            <SearchForm
              handleChange={this.handleChange}
              selectVehicleMake={this.selectVehicleMake}
              selectGearBox={this.selectGearBox}
              vehicleMake={this.state.vehicleMake}
              transmission={this.state.transmission}
              ></SearchForm>
          </div>
          <div className="car-list">
            <div className="car-results-title"><h1>{this.state.totalCount} vehicles found.</h1></div>
              {/* near <span>{this.state.location}</span> */}
            {Object.keys(this.state.cars).map(key => (
              <Car key={key} details={this.state.cars[key]}></Car>
            ))}
            {/* <div className="pagination"><p>Showing {this.state.perPage} out of {this.state.totalCount} results</p></div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
