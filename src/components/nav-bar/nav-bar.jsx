
import React, { useState } from 'react';

import fire from "../../assets/img/icons/purple-fire-light.png";
import * as navbarIcons from "../../assets/img/icons/navbar/navbarIcons";

import "./nav-bar.scss";



const NavBar = ({ onNavItemClick }) => {
  const [activeLink, setActiveLink] = useState('Dashboard');

  const handleNavItemClick = (linkName) => {
    setActiveLink(linkName);
    onNavItemClick(linkName);
  };

  const navItems = [
    { name: 'Dashboard', icon: navbarIcons.dashboard },
    { name: 'Analytics', icon: navbarIcons.analitics },
    { name: 'My Wallet', icon: navbarIcons.wallet },
    { name: 'Accounts', icon: navbarIcons.user },
    { name: 'Settings', icon: navbarIcons.settings },
    { divider: true },
    { name: 'Help Centre', icon: navbarIcons.help },
  ];

  return (
    <section className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__logo">
          <img className="navbar__logo-fire" src={fire} alt="fire" />
          <span className="navbar__logo-logo">Free Bank</span>
        </div>
      
        <div className="navbar__nav">
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.divider ? (
                <div className="navbar__divider"></div>
              ) : (
                <div
                  className={`navbar__item ${activeLink === item.name ? 'navbar__item-active' : ''}`}
                  onClick={() => handleNavItemClick(item.name)}
                >
                  <img src={item.icon} alt="navbar icon" />
                  <span>{item.name}</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NavBar;