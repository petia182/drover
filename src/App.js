import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Car from './components/car';
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
      vehicleMake: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      // console.log(Object.keys(data.metadata.aggregations.vehicle_make));
      this.setState({
        cars: data.data,
        totalCount: data.metadata.total_count,
        perPage: data.metadata.per_page,
        vehicleMake: Object.keys(data.metadata.aggregations.vehicle_make)
      })
    })
  }

  handleChange(event) {
    const input = event.target.value;
    this.setState({
      locationValue: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const searchInput = this.state.locationValue;
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", location: searchInput}),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      this.setState({
        cars: data.data,
        totalCount: data.metadata.total_count,
        perPage: data.metadata.per_page,
        location: searchInput
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
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="search-input">Location</label>
              <input onChange={this.handleChange} ref={this.inputRef} id="search-input" type="text"/>
              <select name="" id="">
                <option defaultValue="Any">Any</option>
                {this.state.vehicleMake.map(car =>
                  <option value={car}>{car}</option>
                )}
              </select>
              <input type="submit"/>
            </form>
          </div>
          <div className="car-list">
            <div className="car-results-title"><h1>{this.state.totalCount} vehicles found near <span>{this.state.location}</span></h1></div>
            {Object.keys(this.state.cars).map(key => (
              <Car key={key} details={this.state.cars[key]}></Car>
            ))}
            <div className="pagination"><p>Showing {this.state.perPage} out of {this.state.totalCount} results</p></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
