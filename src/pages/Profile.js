import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";
import { doc, getDoc } from "firebase/firestore";

function Profile() {

  const [photoURL, setPhotoURL] = useState('')

  console.log("photo", photoURL)

  const user1 = auth.currentUser;
  console.log("user user 1", user1)







  useEffect(() => {
    async function fun() {
      const userDoc = await getDoc(doc(db, "users", user1.uid));
      const userData = userDoc.data();
      console.log("userData", userDoc.data().proImg);
      setPhotoURL(userDoc.data().proImg);
    }
    fun();
  }, [photoURL]);

  //this is redux method to get the state.
  const user = useSelector((state) => state.user.user);

  console.log("My User", user);
  if (!user) {
    return <Loader />;
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper" >
        <div className="profilePic">
          <img src={photoURL} alt="profilePicture" />
        </div>
        <div className="inner-field-profile">
          <h1><strong style={{ color: "wheat" }}>Name</strong>  : {user.name}</h1>
          <h1><strong style={{ color: "wheat" }}>Email</strong> : {user.email}</h1>
          <h1><strong style={{ color: "wheat" }}>User Id</strong> : {user.uid}</h1>
        </div>
        <Button text={"Logout"} onClick={handleLogout} width={300} />
      </div>
    </div>
  );
}

export default Profile;
