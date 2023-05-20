

import { useNavigate} from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase";

import logOut from "../../assets/img/icons/log-out.png";

import "./sign-out.scss";



const SignOut = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    signOut(auth).then(() => {
      // console.log("Sign-out successful.");
      navigate('/');
    }).catch((error) => {
      // console.log("Sign-out error.");
      // console.log(error);
    });
    
  }

    return (    
      <div className="sign-out">
        <button onClick={handleSubmit}><img src={logOut} alt="logOut" /></button>
      </div>
      
    );
};

export default SignOut;