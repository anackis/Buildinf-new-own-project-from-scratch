
import { useState, useEffect } from "react";

import SignOut from "../sign-out/sign-out";
import chnageIcon from "../../assets/img/user-block/change-user-icon.png";
import './user-block.scss';


const UserBlock = (props) => {
  const {userDataDB, uploadImg} = props

  const [createdAt, setCreatedAt] = useState();
  // const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (userDataDB) {
      if (userDataDB.createdAt) {
        formatTimestamp(userDataDB.createdAt);
      } 
      // setLoading(false);
    }
  }, [userDataDB]);


  const handleImgUploadChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadImg(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }
  

  function formatTimestamp({ seconds, nanoseconds }) {
    const totalMilliseconds = (seconds * 1000) + (nanoseconds / 1000000);
    const date = new Date(totalMilliseconds);
    const formattedDate = date.toLocaleDateString();
    setCreatedAt(formattedDate);
  };
  

  // if (loading) {
  //   return <div>Loading...</div>;
  // }


  return (
    <div className="user-block">
      <h2 className="user-block__profile">Profile</h2>
      
      <div className="user-block__img-and-name">
        <img className="user-block__user-icon" src={userDataDB.userImg} alt="userImg" />
        <div className="user-block__user-icon-right">
        {userDataDB.displayName ? <h2>{userDataDB.displayName}</h2> : null}
          <label htmlFor="inputfile">
            <img className="user-block__user-icon-change" src={chnageIcon} alt="chnageIcon" />
            
            <input id="inputfile" type="file" onChange={handleImgUploadChange} accept="image/*" />
          </label>
          
        </div>
        <SignOut/>
      </div>

      <div className="user-block__wrapper">
      
        {userDataDB.balance ? <h3>Balance ${userDataDB.balance}</h3> : null}
        {<div className="user-block__text">Card owner : {userDataDB.displayName}</div>}
        {<div className="user-block__text">Card number : {userDataDB.cardNumber}</div>}
        
        {<div className="user-block__text">Account created : {createdAt}</div>}
      
      </div>
      
    </div>
  );
};

export default UserBlock;