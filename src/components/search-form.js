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
        <label>Vehicle Make</label>
        <select onChange={this.props.selectVehicleMake}>
          <option disabled={true} selected={true}>Select Vehicle Make</option>
          {Object.keys(this.props.vehicleMake).map((car, index) =>
            <option key={index} value={car}>{capitalize(car)} ({this.props.vehicleMake[car]})</option>
          )}
        </select>
        <label>Gearbox</label>
        <select onChange={this.props.selectGearBox}>
          <option disabled selected={true}>Select gearbox</option>
          {Object.keys(this.props.transmission).map((car, index) =>
            <option key={index} value={car}>{capitalize(car)} ({this.props.transmission[car]})</option>
          )}
        </select>
        <label>Year</label>
        <select onChange={this.props.selectYear}>
          <option disabled selected={true}>Select year</option>
          {Object.keys(this.props.year).map((car, index) =>
            <option key={index} value={car}>{car} ({this.props.year[car]})</option>
          )}
        </select>
        <label>Fuel Type</label>
        <select onChange={this.props.selectFuelType}>
          <option disabled selected={true}>Select Fuel Type</option>
          {Object.keys(this.props.fuel).map((car, index) =>
            <option key={index} value={car}>{car} ({this.props.fuel[car]})</option>
          )}
        </select>
        <label>Body Type</label>
        <select onChange={this.props.selectBodyType}>
          <option disabled selected={true}>Select Body Type</option>
          {Object.keys(this.props.bodyType).map((car, index) =>
            <option key={index} value={car}>{car} ({this.props.bodyType[car]})</option>
          )}
        </select>
    </React.Fragment>
    )
  }
}

export default SearchForm;
