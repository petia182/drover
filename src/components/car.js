import React from 'react';

import { capitalize } from './helper-functions';

class Car extends React.Component {

  render() {
    const { vehicle_make, vehicle_model, postcode, year, body_information, fuel, transmission, color, images, available_start_date } = this.props.details;
    const image = images[0].small_image_url;
    const features = this.props.details.features;
    // console.log(features)

    return(
      <div className="single-car">
        <div className="car-image-wrapper">
          <div className="car-image" style={{ backgroundImage: `url(${image})`}}></div>
        </div>
        <div className="car-description">
          <div>
            <div className="title-wrapper">
              <h2>{vehicle_make}<span> {vehicle_model}</span></h2>
              <p className="located">Located in {postcode}</p>
            </div>
            <p className="availability">Available from {available_start_date}</p>
          </div>
          <ul className="car-specs">
            <li>{year}</li>
            <li>{body_information}</li>
            <li>{fuel}</li>
            <li>{transmission}</li>
            <li>{color}</li>
          </ul>
          <ul className="car-features">
            {features.map(feature => {
              return <li>{capitalize(feature.split('_').join(' '))}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Car;
