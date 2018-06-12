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
          <option disabled={true} selected={true}>Select Vehicle Make</option>
          {Object.keys(this.props.vehicleMake).map((car, index) =>
            <option key={index} value={car}>{capitalize(car)} ({this.props.vehicleMake[car]})</option>
          )}
        </select>
        <label htmlFor="transmission-selection">Gearbox</label>
        <select onChange={this.props.selectGearBox} name="" id="transmission-selection">
          <option disabled selected={true}>Select gearbox</option>
          {Object.keys(this.props.transmission).map((car, index) =>
            <option key={index} value={car}>{capitalize(car)} ({this.props.transmission[car]})</option>
          )}
        </select>
        <label htmlFor="year-selection">Year</label>
        <select onChange={this.props.selectYear} name="" id="year-selection">
          <option disabled selected={true}>Select year</option>
          {Object.keys(this.props.year).map((car, index) =>
            <option key={index} value={car}>{car} ({this.props.year[car]})</option>
          )}
        </select>
        <label htmlFor="fuel-selection">Fuel Type</label>
        <select onChange={this.props.selectFuelType} name="" id="fuel-selection">
          <option disabled selected={true}>Select Fuel Type</option>
          {Object.keys(this.props.fuel).map((car, index) =>
            <option key={index} value={car}>{car} ({this.props.fuel[car]})</option>
          )}
        </select>
        <label htmlFor="body-type-selection">Body Type</label>
        <select onChange={this.props.selectBodyType} name="" id="body-type-selection">
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
