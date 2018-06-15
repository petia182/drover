import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';

// import Pagination from './components/pagination';
import ReactPaginate from 'react-paginate';

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
      currentPage: 0,
      location: 'london',
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
      page: 1,
      currentData: {},
    };
  }

  componentDidMount() {
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({
        vehicle_type: 'Consumer',
        location: this.state.location,
        page: this.state.page,
      }),
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cars: data.data,
          totalCount: data.metadata.total_count,
          vehicleMake: data.metadata.aggregations.vehicle_make,
          transmission: data.metadata.aggregations.transmission,
          year: data.metadata.aggregations.year,
          fuel: data.metadata.aggregations.fuel,
          carType: data.metadata.aggregations.tags,
          bodyType: data.metadata.aggregations.body_information,
          currentPage: data.metadata.page,
          perPage: data.metadata.per_page,
        });
      });
  }

  locationSearch = event => {
    const locationInput = event.name;
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({
        vehicle_type: 'Consumer',
        location: locationInput,
        vehicle_make: this.state.vehicleMakeValue,
        transmission: this.state.transmissionValue,
        year: this.state.yearValue,
        fuel: this.state.fuelValue,
        body_type: this.state.bodyTypeValue,
      }),
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
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
            currentPage: data.metadata.page,
            totalCount: data.metadata.total_count,
            perPage: data.metadata.per_page,
          });
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
          });
        }
      });
  };

  getUserInput(event) {
    return event.target.value;
  }

  onPageChange(page) {
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({
        vehicle_type: 'Consumer',
        location: this.state.location,
        vehicle_make: this.state.vehicleMakeValue,
        transmission: this.state.transmissionValue,
        year: this.state.yearValue,
        fuel: this.state.fuelValue,
        body_type: this.state.bodyTypeValue,
        page: page,
      }),
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cars: data.data,
        });
      });
  }

  handleChange(
    event,
    vehicleMakeValue,
    transmissionValue,
    yearValue,
    fuelValue,
    bodyTypeValue,
    page,
  ) {
    event.preventDefault();
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({
        vehicle_type: 'Consumer',
        location: this.state.location,
        vehicle_make: vehicleMakeValue,
        transmission: transmissionValue,
        year: yearValue,
        fuel: fuelValue,
        body_type: bodyTypeValue,
        page: page,
      }),
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cars: data.data,
          vehicleMake: data.metadata.aggregations.vehicle_make,
          transmission: data.metadata.aggregations.transmission,
          year: data.metadata.aggregations.year,
          fuel: data.metadata.aggregations.fuel,
          carType: data.metadata.aggregations.tags,
          bodyType: data.metadata.aggregations.body_information,
          currentPage: data.metadata.page,
          totalCount: data.metadata.total_count,
          perPage: data.metadata.per_page,
          vehicleMakeValue,
          yearValue,
          fuelValue,
          bodyTypeValue,
          transmissionValue,
        });
      });
  }

  getTotalPage() {
    return Math.ceil(this.state.totalCount / this.state.perPage);
  }

  render() {
    return (
      <div className="wrapper">
        <Nav />
        <div className="container">
          <div className="search">
            <form action="">
              <label htmlFor="location-input">Location</label>
              <Autocomplete
                id="location-input"
                onPlaceSelected={this.locationSearch}
                types={['(regions)']}
                componentRestrictions={{ country: 'uk' }}
              />
              <SearchForm
                locationSearch={this.locationSearch}
                selectVehicleMake={event =>
                  this.handleChange(
                    event,
                    this.getUserInput(event),
                    this.state.transmissionValue,
                    this.state.yearValue,
                    this.state.fuelValue,
                    this.state.bodyTypeValue,
                  )
                }
                selectGearBox={event =>
                  this.handleChange(
                    event,
                    this.state.vehicleMakeValue,
                    this.getUserInput(event),
                    this.state.yearValue,
                    this.state.fuelValue,
                    this.state.bodyTypeValue,
                  )
                }
                selectYear={event =>
                  this.handleChange(
                    event,
                    this.state.vehicleMakeValue,
                    this.state.transmissionValue,
                    parseInt(this.getUserInput(event), 0),
                    this.state.fuelValue,
                    this.state.bodyTypeValue,
                  )
                }
                selectFuelType={event =>
                  this.handleChange(
                    event,
                    this.state.vehicleMakeValue,
                    this.state.transmissionValue,
                    this.state.yearValue,
                    this.getUserInput(event),
                    this.state.bodyTypeValue,
                  )
                }
                selectBodyType={event =>
                  this.handleChange(
                    event,
                    this.state.vehicleMakeValue,
                    this.state.transmissionValue,
                    this.state.yearValue,
                    this.state.fuelValue,
                    this.getUserInput(event),
                  )
                }
                vehicleMake={this.state.vehicleMake}
                transmission={this.state.transmission}
                year={this.state.year}
                fuel={this.state.fuel}
                bodyType={this.state.bodyType}
              />
            </form>
          </div>
          <div className="car-list">
            <div className="car-results-title">
              <h1>
                {this.state.totalCount}{' '}
                {this.state.totalCount === 1 ? 'vehicle' : 'vehicles'} found
                near <span>{this.state.location}.</span>
              </h1>
            </div>
            {Object.keys(this.state.cars).map(key => (
              <Car key={key} details={this.state.cars[key]} />
            ))}
            <div className="pagination-text">
              <p>
                Showing {this.state.cars.length} of {this.state.totalCount}{' '}
                results
              </p>
            </div>
            <ReactPaginate
              pageCount={this.getTotalPage()}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              containerClassName={'pagination'}
              onPageChange={e => this.onPageChange(e.selected + 1)}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
