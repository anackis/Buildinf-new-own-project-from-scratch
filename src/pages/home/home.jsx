
import icons from "../../assets/img/icons/icons.png";
import fire from "../../assets/img/icons/purple-fire.png";

import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";

import "./home.scss";


const Home = () => {

  return (
    <section className="home" >
      
      <div className="home__wrapper">
        <div className="home__left">
          <div className="home__logo">
            <img className="home__logo-fire" src={fire} alt="fire" />
            <span className="home__logo-logo">Free Bank</span>
          </div>
          <img className='home__icon' src={icons} alt="1png" />
          <h1>Welcome to Free Bank. Here you can feel rich, add any amount on your funds balance and transfer funds to other members of Free Bank.</h1>
        </div>
     
        <div className="home__right">
          <div className="home__right_wrapper">
            <SignIn/>
            <SignUp/>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Home;