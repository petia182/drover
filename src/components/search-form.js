import React from 'react';

import { capitalize } from './helper-functions';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  renderSearchField(title, selectOption, optionSelected, placeholder) {
    return (
      <React.Fragment>
        <label>{title}</label>
        <select onChange={selectOption}>
          <option disabled={true} selected={true}>{placeholder}</option>
          {Object.keys(optionSelected).map((car, index) =>
            <option key={index} value={car}>{capitalize(car)} ({optionSelected[car]})</option>
          )}
        </select>
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderSearchField("Vehicle Make", this.props.selectVehicleMake, this.props.vehicleMake, "Select vehicle make")}
        {this.renderSearchField("Gearbox", this.props.selectGearBox, this.props.transmission, "Select Gear Box")}
        {this.renderSearchField("Year", this.props.selectYear, this.props.year, "Select Year")}
        {this.renderSearchField("Fuel Type", this.props.selectFuelType, this.props.fuel, "Select Fuel Type")}
        {this.renderSearchField("Body Type", this.props.selectBodyType, this.props.bodyType, "Select Body Type")}
    </React.Fragment>
    )
  }
}

export default SearchForm;
