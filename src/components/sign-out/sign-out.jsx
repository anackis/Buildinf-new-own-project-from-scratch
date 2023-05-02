

import { useNavigate} from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase";





const SignOut = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    signOut(auth).then(() => {
      console.log("Sign-out successful.");
      navigate('/');
    }).catch((error) => {
      console.log("Sign-out error.");
      console.log(error);
    });
    
  }

    return (
        <div>
          <button onClick={handleSubmit}>SignOut</button>
        </div>
    );
};

export default SignOut;