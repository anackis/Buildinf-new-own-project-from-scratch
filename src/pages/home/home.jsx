

import { useState, useEffect } from 'react';
// // import { Link } from "react-router-dom";
// import { auth } from "../../utils/firebase/firebase";

import icons from "../../assets/img/icons/icons.png";
import fire from "../../assets/img/icons/purple-fire.png";

import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";
import SignOut from "../../components/sign-out/sign-out";




import "./home.scss";

const Home = () => {

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       console.log("// User is signed in");
  //       setUser(user);
  //     } else {
  //       console.log("// User is signed out");
  //       setUser(null);
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  

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
            {/* <div className="home__right_header">
              {user ? <h2>Welcome, {user.displayName}!</h2> : <h2>Please sign in.</h2>}
              <div className="home__right_divider"></div>
            </div> */}
            
            <SignIn/>
            <SignUp/>
            {/* <SignOut/> */}
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Home;