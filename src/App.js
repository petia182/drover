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
      bodyType: {},
    }
  }

  componentDidMount() {
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", location: this.state.location, vehicle_make: this.state.vehicleMakeValue, transmission: this.state.transmissionValue, year: this.state.yearValue, fuel: this.state.fuelValue}),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      // console.log(data.metadata.aggregations)
      this.setState({
        cars: data.data,
        totalCount: data.metadata.total_count,
        // perPage: data.metadata.per_page,
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
      body: JSON.stringify({vehicle_type: "Consumer", location: locationInput, vehicle_make: this.state.vehicleMakeValue, transmission: this.state.transmissionValue, year: this.state.yearValue, fuel: this.state.fuelValue}),
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
          totalCount: data.metadata.total_count,
          // perPage: data.metadata.per_page,
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

  selectVehicleMake = (event) => {
    const vehicleMakeValue = event.target.value;
    event.preventDefault();
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", location: this.state.location, vehicle_make: vehicleMakeValue, transmission: this.state.transmissionValue, year: this.state.yearValue, fuel: this.state.fuelValue}),
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
        vehicleMakeValue
      })
    })
  }

  selectGearBox = (event) => {
    event.preventDefault();
    const transmissionValue = event.target.value;
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", transmission: transmissionValue, location: this.state.location, vehicle_make: this.state.vehicleMakeValue, year: this.state.yearValue, fuel: this.state.fuelValue }),
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
        transmissionValue,
      })
    })
  }

  selectYear = (event) => {
    event.preventDefault();
    const yearValue = parseInt(event.target.value);
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", transmission: this.state.transmissionValue, location: this.state.location, vehicle_make: this.state.vehicleMakeValue, year: yearValue, fuel: this.state.fuelValue}),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data.metadata.aggregations)
      this.setState({
        cars: data.data,
        year: data.metadata.aggregations.year,
        fuel: data.metadata.aggregations.fuel,
        carType: data.metadata.aggregations.tags,
        bodyType: data.metadata.aggregations.body_information,
        totalCount: data.metadata.total_count,
        transmission: data.metadata.aggregations.transmission,
        vehicleMake: data.metadata.aggregations.vehicle_make,
        yearValue
      })
    })
  }

  selectFuelType = (event) => {
    event.preventDefault();
    const fuelValue = event.target.value;
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", transmission: this.state.transmissionValue, location: this.state.location, vehicle_make: this.state.vehicleMakeValue, year: this.state.yearValue, fuel: fuelValue}),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data.metadata.aggregations)
      this.setState({
        cars: data.data,
        year: data.metadata.aggregations.year,
        fuel: data.metadata.aggregations.fuel,
        carType: data.metadata.aggregations.tags,
        bodyType: data.metadata.aggregations.body_information,
        totalCount: data.metadata.total_count,
        transmission: data.metadata.aggregations.transmission,
        vehicleMake: data.metadata.aggregations.vehicle_make,
        year: data.metadata.aggregations.year,
        fuelValue
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
              selectVehicleMake={this.selectVehicleMake}
              selectGearBox={this.selectGearBox}
              selectYear={this.selectYear}
              selectFuelType={this.selectFuelType}
              vehicleMake={this.state.vehicleMake}
              vehicleMakeValue={this.state.vehicleMakeValue}
              transmissionValue={this.state.transmissionValue}
              yearValue={this.state.yearValue}
              transmission={this.state.transmission}
              year={this.state.year}
              fuel={this.state.fuel}
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
