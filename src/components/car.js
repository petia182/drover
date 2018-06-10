import React from 'react';

class Car extends React.Component {

  render() {
    const { vehicle_make, vehicle_model, postcode, year, body_information, fuel, transmission, color, images } = this.props.details;
    const image = images[0].small_image_url;
    return(
      <div className="single-car">
        <div className="car-image-wrapper">
          <div className="car-image" style={{ backgroundImage: `url(${image})`}}></div>
        </div>
        <div className="car-description">
          <h2>{vehicle_make}<span> {vehicle_model}</span></h2>
          <p>Located in {postcode}</p>
          <hr/>
          <ul className="car-specs">
            <li>{year}</li>
            <li>{body_information}</li>
            <li>{fuel}</li>
            <li>{transmission}</li>
            <li>{color}</li>
          </ul>
          <hr/>
          {/* <ul className="car-features">
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
          </ul> */}
        </div>
      </div>
    )
  }
}

export default Car;
