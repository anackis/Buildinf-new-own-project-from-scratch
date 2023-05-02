


import "./nav-bar.scss";
import fire from "../../assets/img/icons/purple-fire-light.png";
import dashboard from "../../assets/img/icons/navbar/dashboard.png";
import analitics from "../../assets/img/icons/navbar/analitics.png";
import wallet from "../../assets/img/icons/navbar/wallet.png";
import user from "../../assets/img/icons/navbar/user.png";
import settings from "../../assets/img/icons/navbar/settings.png";
import help from "../../assets/img/icons/navbar/help.png";

const NavBar = () => {
  return (
    <section className="navbar">

      <div className="navbar__logo">
        <img className="navbar__logo-fire" src={fire} alt="fire" />
        <span className="navbar__logo-logo">Free Bank</span>
      </div>
    
      <div className="navbar__nav">
        <div className="navbar__item navbar__item-active">
          <img src={dashboard} alt="navbar icon" />
          <span>Dashboard</span>
        </div>
        <div className="navbar__item">
          <img src={analitics} alt="navbar icon" />
          <span>Analytics</span>
        </div>
        <div className="navbar__item">
          <img src={wallet} alt="navbar icon" />
          <span>My Wallet</span>
        </div>
        <div className="navbar__item">
          <img src={user} alt="navbar icon" />
          <span>Accounts</span>
        </div>
        <div className="navbar__item">
          <img src={settings} alt="navbar icon" />
          <span>Settings</span>
        </div>
        <div className="navbar__divider"></div>
        <div className="navbar__item">
          <img src={help} alt="navbar icon" />
          <span>Help Centre</span>
        </div>
      </div>

    </section>
  );
};

export default NavBar;