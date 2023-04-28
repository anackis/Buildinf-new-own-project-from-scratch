


import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase";


const handleSubmit = () => {
  signOut(auth).then(() => {
    console.log("Sign-out successful.");
  }).catch((error) => {
    console.log("Sign-out error.");
    console.log(error);
  });
  
}


const SignOut = () => {
    return (
        <div>
          <button onClick={handleSubmit}>SignOut</button>
        </div>
    );
};

export default SignOut;