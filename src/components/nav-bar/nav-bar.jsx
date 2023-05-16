
import React, { useState, useEffect } from 'react';

import fire from "../../assets/img/icons/purple-fire-light.png";
import hamburger from "../../assets/img/icons/hamburger.png"
import * as navbarIcons from "../../assets/img/icons/navbar/navbarIcons";

import "./nav-bar.scss";



const NavBar = ({ onNavItemClick }) => {
  const [activeLink, setActiveLink] = useState('Dashboard');
  const [hamburgerSwitch, setHamburgerSwitch] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1250) {
        setHamburgerSwitch(false);
      } else {
        setHamburgerSwitch(true);
      }
    }

    // Add event listener for the resize event
    window.addEventListener('resize', handleResize);

    // Initial check when the component mounts
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleHamburgerClick = () => {
    setHamburgerSwitch(!hamburgerSwitch);
  }

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

      <div className="navbar__logo navbar__logo_mobile">
        <img className="navbar__logo-fire" src={fire} alt="fire" />
        <span className="navbar__logo-logo">Free Bank</span>
      </div>

      <button className='hamburger' onClick={() => handleHamburgerClick()}>
        <img src={hamburger} alt="hamburger" />
      </button>

      {/* <div className="navbar__wrapper"> */}
      <div className={hamburgerSwitch ? "navbar__wrapper hiden" : "navbar__wrapper"}>
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