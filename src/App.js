import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';

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
      vehicleMake: {},
      vehicleMakeValue: undefined,
      transmission: {},
      transmissionValue: undefined,
      year: {},
      yearValue: undefined,
      fuel: {},
      fuelValue: undefined,
      carType: {},
      carTypeValue: undefined,
      bodyType: {},
      bodyTypeValue: undefined,
      userInput: '',
    }
  }

  componentDidMount() {
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", location: this.state.location}),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        cars: data.data,
        totalCount: data.metadata.total_count,
        vehicleMake: data.metadata.aggregations.vehicle_make,
        transmission: data.metadata.aggregations.transmission,
        year: data.metadata.aggregations.year,
        fuel: data.metadata.aggregations.fuel,
        carType: data.metadata.aggregations.tags,
        bodyType: data.metadata.aggregations.body_information,
      })
    })
  }

  locationSearch = (event) => {
    const locationInput = event.name;
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", location: locationInput, vehicle_make: this.state.vehicleMakeValue, transmission: this.state.transmissionValue, year: this.state.yearValue, fuel: this.state.fuelValue, body_type: this.state.bodyTypeValue}),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      if (data.data.length > 0) {
        this.setState({
          cars: data.data,
          location: locationInput,
          vehicleMake: data.metadata.aggregations.vehicle_make,
          transmission: data.metadata.aggregations.transmission,
          year: data.metadata.aggregations.year,
          fuel: data.metadata.aggregations.fuel,
          carType: data.metadata.aggregations.tags,
          bodyType: data.metadata.aggregations.body_information,
          totalCount: data.metadata.total_count
        })
      } else {
        this.setState({
          cars: data.data,
          location: locationInput,
          totalCount: 0,
          vehicleMake: {},
          transmission: {},
          year: {},
          fuel: {},
          carType: {},
          bodyType: {},
        })
      }
    })
  }

  getUserInput(event) {
    return event.target.value
  }

  handleChange(event, vehicleMakeValue, transmissionValue, yearValue, fuelValue, bodyTypeValue) {
    event.preventDefault();
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", location: this.state.location, vehicle_make: vehicleMakeValue, transmission: transmissionValue, year: yearValue, fuel: fuelValue, body_type: bodyTypeValue}),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      // console.log(data.data)
      this.setState({
        cars: data.data,
        vehicleMake: data.metadata.aggregations.vehicle_make,
        transmission: data.metadata.aggregations.transmission,
        year: data.metadata.aggregations.year,
        fuel: data.metadata.aggregations.fuel,
        carType: data.metadata.aggregations.tags,
        bodyType: data.metadata.aggregations.body_information,
        totalCount: data.metadata.total_count,
        vehicleMakeValue,
        yearValue,
        fuelValue,
        bodyTypeValue,
        transmissionValue
      })
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Nav/>
        <div className="container">
          <div className="search">
            <form action="">
              <label htmlFor="location-input">Location</label>
            <Autocomplete
              id="location-input"
              onPlaceSelected={this.locationSearch}
              types={['(regions)']}
              componentRestrictions={{country: "uk"}}
            />
            <SearchForm
              locationSearch={this.locationSearch}
              selectVehicleMake={(event) => this.handleChange(event, this.getUserInput(event), this.state.transmissionValue, this.state.yearValue, this.state.fuelValue, this.state.bodyTypeValue)}
              selectGearBox={(event) => this.handleChange(event, this.state.vehicleMakeValue, this.getUserInput(event), this.state.yearValue, this.state.fuelValue, this.state.bodyTypeValue)}
              selectYear={(event) => this.handleChange(event, this.state.vehicleMakeValue, this.state.transmissionValue, parseInt(this.getUserInput(event), 0), this.state.fuelValue, this.state.bodyTypeValue)}
              selectFuelType={(event) => this.handleChange(event, this.state.vehicleMakeValue, this.state.transmissionValue, this.state.yearValue, this.getUserInput(event), this.state.bodyTypeValue)}
              selectBodyType={(event) => this.handleChange(event, this.state.vehicleMakeValue, this.state.transmissionValue, this.state.yearValue, this.state.fuelValue, this.getUserInput(event))}
              vehicleMake={this.state.vehicleMake}
              transmission={this.state.transmission}
              year={this.state.year}
              fuel={this.state.fuel}
              bodyType={this.state.bodyType}
              ></SearchForm>
            </form>
          </div>
          <div className="car-list">
            <div className="car-results-title"><h1>{this.state.totalCount} {this.state.totalCount === 1 ? "vehicle" : "vehicles"} found near <span>{this.state.location}.</span></h1></div>
            {Object.keys(this.state.cars).map(key => (
              <Car key={key} details={this.state.cars[key]}></Car>
            ))}
            {/* <div className="pagination"><p>Showing {this.state.perPage} of {this.state.totalCount} results</p></div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
