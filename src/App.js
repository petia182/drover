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
      cars: []
    }
  }

  componentDidMount() {
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer"}),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      this.setState({
        cars: data.data
      })
    })
  }

  locationSearch = () => {
    const searchInput = this.inputRef.current.value;
    fetch('https://app.joindrover.com/api/web/vehicles', {
      body: JSON.stringify({vehicle_type: "Consumer", location: searchInput}),
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      // console.log(data.data)
      this.setState({
        cars: data.data
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
              <label htmlFor="search-input">Location</label>
              <input ref={this.inputRef} id="search-input" type="text"/>
              <input onClick={this.locationSearch} type="submit"/>
            </form>
          </div>
          <div className="car-list">
            {Object.keys(this.state.cars).map(key => (
              // console.log(this.state.cars[key].vehicle_make)
              <Car key={key} details={this.state.cars[key]}></Car>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
