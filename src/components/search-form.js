import React from 'react';

import { capitalize } from './helper-functions';

class SearchForm extends React.Component {
  // constructor(props) {
  //   super(props);
  //   state = {}
  // }

  render() {
    return (
      <React.Fragment>
        <label htmlFor="make-selection">Vehicle Make</label>
        <select onChange={this.props.selectVehicleMake} name="" id="make-selection">
          {/* <option defaultValue="Any">Any</option> */}
          {Object.keys(this.props.vehicleMake).map((car, index) =>
            <option key={index} value={car}>{capitalize(car)} ({this.props.vehicleMake[car]})</option>
          )}
        </select>
        {/* <option key={index} value={car}>{capitalize(car)} ({this.props.vehicleMake[car]})</option> */}
        <label htmlFor="transmission-selection">Gearbox</label>
        <select onChange={this.props.selectGearBox} name="" id="transmission-selection">
          {/* <option defaultValue="Any">Any</option> */}
          {Object.keys(this.props.transmission).map((car, index) =>
            <option key={index} value={car}>{capitalize(car)} ({this.props.transmission[car]})</option>
          )}
          {/* <option key={index} value={car}>{capitalize(car)} ({this.props.transmission[car]})</option> */}
        </select>
        {/* <label htmlFor="year-selection">Year</label>
        <select name="" id="year-selection">
          <option defaultValue="Any">Any</option>
          {Object.keys(this.props.year).map((car, index) =>
            <option key={index} value={car}>{car} ({this.state.year[car]})</option>
          )}
        </select> */}
        {/* <label htmlFor="fuel-selection">Fuel Type</label>
        <select name="" id="fuel-selection">
          <option defaultValue="Any">Any</option>
          {Object.keys(this.state.fuel).map((car, index) =>
            <option key={index} value={car}>{car} ({this.state.fuel[car]})</option>
          )}
        </select>
        <label htmlFor="car-type-selection">Car Type</label>
        <select name="" id="car-type-selection">
          <option defaultValue="Any">Any</option>
          {Object.keys(this.state.carType).map((car, index) =>
            <option key={index} value={car}>{car} ({this.state.carType[car]})</option>
          )}
        </select>
        <label htmlFor="body-type-selection">Body Type</label>
        <select name="" id="body-type-selection">
          <option defaultValue="Any">Any</option>
          {Object.keys(this.state.bodyType).map((car, index) =>
            <option key={index} value={car}>{car} ({this.state.bodyType[car]})</option>
          )}
        </select> */}
    </React.Fragment>
    )
  }
}

export default SearchForm;
