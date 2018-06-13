import React from 'react';
import Moment from 'react-moment';

import { capitalize } from './helper-functions';

class Car extends React.Component {

  render() {
    const { vehicle_make, vehicle_model, postcode, year, body_information, fuel, transmission, color, images, available_start_date } = this.props.details;
    const image = images[0].image_url;
    const features = this.props.details.features;
    const price = this.props.details.price_discount_and_deposit_schedule_hash[1].subtotal_price_pounds;

    return(
      <div className="single-car">
        <div className="car-image-wrapper">
          <div className="car-image" style={{ backgroundImage: `url(${image})`}}></div>
        </div>
        <div className="car-description">
          <div className="title-wrap">
            <div className="title-wrapper">
              <h2>{vehicle_make}<span> {vehicle_model}</span></h2>
              <p className="located">Located in {postcode}</p>
            </div>
            <p className="availability">Available from <Moment format="Do MMMM YYYY">{available_start_date}</Moment></p>
          </div>
          <ul className="car-specs">
            <li>{year}</li>
            <li>{body_information}</li>
            <li>{fuel}</li>
            <li>{transmission}</li>
            <li>{color}</li>
          </ul>
          <ul className="car-features">
            {features.map((feature, index) => {
              return <li key={index}>{capitalize(feature.split('_').join(' '))}</li>
            })}
          </ul>
          <div className="price">
            <div>
              <p>£ {Math.trunc(price)}<span>/month</span></p>
              <p><span>(Monthly Vehicle Price inc. VAT)</span></p>
            </div>
            <button>See more details</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Car;
