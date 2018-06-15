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
      vehicle_type: 'Consumer',
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
        vehicle_type: this.state.vehicle_type,
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

  getUserInput(event) {
    return event.target.value;
  }

  getLocationInput(event) {
    return event.name;
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
    location,
    vehicleMakeValue,
    transmissionValue,
    yearValue,
    fuelValue,
    bodyTypeValue,
    page,
    vehicle_type,
  ) {
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({
        vehicle_type,
        location,
        vehicle_make: vehicleMakeValue,
        transmission: transmissionValue,
        year: yearValue,
        fuel: fuelValue,
        body_type: bodyTypeValue,
        page,
      }),
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
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
          location,
          vehicleMakeValue,
          yearValue,
          fuelValue,
          bodyTypeValue,
          transmissionValue,
          vehicle_type,
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
            <form className="search-form" action="">
              <label htmlFor="location-input">Location</label>
              <Autocomplete
                className="input"
                onPlaceSelected={event =>
                  this.handleChange(
                    event,
                    this.getLocationInput(event),
                    this.state.vehicleMakeValue,
                    this.state.transmissionValue,
                    this.state.yearValue,
                    this.state.fuelValue,
                    this.state.bodyTypeValue,
                    this.state.page,
                    this.state.vehicle_type,
                  )
                }
                types={['(regions)']}
                componentRestrictions={{ country: 'uk' }}
              />
              <SearchForm
                locationSearch={this.locationSearch}
                selectVehicleMake={event =>
                  this.handleChange(
                    event,
                    this.state.location,
                    this.getUserInput(event),
                    this.state.transmissionValue,
                    this.state.yearValue,
                    this.state.fuelValue,
                    this.state.bodyTypeValue,
                    this.state.page,
                    this.state.vehicle_type,
                  )
                }
                selectGearBox={event =>
                  this.handleChange(
                    event,
                    this.state.location,
                    this.state.vehicleMakeValue,
                    this.getUserInput(event),
                    this.state.yearValue,
                    this.state.fuelValue,
                    this.state.bodyTypeValue,
                    this.state.page,
                    this.state.vehicle_type,
                  )
                }
                selectYear={event =>
                  this.handleChange(
                    event,
                    this.state.location,
                    this.state.vehicleMakeValue,
                    this.state.transmissionValue,
                    parseInt(this.getUserInput(event), 0),
                    this.state.fuelValue,
                    this.state.bodyTypeValue,
                    this.state.page,
                    this.state.vehicle_type,
                  )
                }
                selectFuelType={event =>
                  this.handleChange(
                    event,
                    this.state.location,
                    this.state.vehicleMakeValue,
                    this.state.transmissionValue,
                    this.state.yearValue,
                    this.getUserInput(event),
                    this.state.bodyTypeValue,
                    this.state.page,
                    this.state.vehicle_type,
                  )
                }
                selectBodyType={event =>
                  this.handleChange(
                    event,
                    this.state.location,
                    this.state.vehicleMakeValue,
                    this.state.transmissionValue,
                    this.state.yearValue,
                    this.state.fuelValue,
                    this.getUserInput(event),
                    this.state.page,
                    this.state.vehicle_type,
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
              <div className="subscription">
                <p>Choose your subscription type:</p>
                <form action="">
                  <div>
                    <input
                      onChange={event =>
                        this.handleChange(
                          event,
                          this.state.location,
                          this.state.vehicleMakeValue,
                          this.state.transmissionValue,
                          this.state.yearValue,
                          this.state.fuelValue,
                          this.state.bodyTypeValue,
                          this.state.page,
                          'Consumer',
                        )
                      }
                      type="radio"
                      name="tabs"
                    />
                    <label htmlFor="">
                      Monthly Rolling Subscription (cancel or swap monthly)
                    </label>
                  </div>
                  <div>
                    <input
                      onChange={event =>
                        this.handleChange(
                          event,
                          this.state.location,
                          this.state.vehicleMakeValue,
                          this.state.transmissionValue,
                          this.state.yearValue,
                          this.state.fuelValue,
                          this.state.bodyTypeValue,
                          this.state.page,
                          'PCO',
                        )
                      }
                      type="radio"
                      name="tabs"
                    />
                    <label htmlFor="">
                      Minimum Commitment Subscription (get discounts!)
                    </label>
                  </div>
                </form>
              </div>
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
