

import React from "react";
import {Link, useNavigate} from 'react-router-dom';

import darkPlanet from "../../assets/img/icons/dark-planet.png";

import "./not-found.scss";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <img className="not-found__planet" src={darkPlanet} alt="darkPlanet" />

      <div className="not-found__wrapper">
        <span className="not-found__404">404</span>
        <span className="not-found__text">Oh No! Your Page was sucked in a black hole!</span>
        <Link className="not-found__link" to="/">Go to homepage</Link>
      </div>
      
      
    </div>
  );
};

export default NotFound;