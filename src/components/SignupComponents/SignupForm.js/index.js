import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileInput from "../../common/Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    console.log("Handling Signup...");

    console.log("prifile image", profileImage)
    setLoading(true);
    if (
      password == confirmPassword &&
      password.length >= 6 &&
      fullName &&
      email && profileImage
    ) {
      try {
        // Creating user's account.
        //here function which used below given by the 'firebase'
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        console.log("user", user);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );

        

        await uploadBytes(displayImageRef, profileImage);

        const displayImageUrl = await getDownloadURL(displayImageRef);

        setProfileImage(displayImageUrl);
        // Saving user's details in Firestore 'setDoc' is inbuild method.
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
          proImg: displayImageUrl
        });

        // Save the data in the 'redux' store.
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
            proImg: displayImageUrl
          })
        );

        //this pop up the message after sucessfully created the account.
        toast.success("User has been created!");

        //make lading false.
        setLoading(false);

        //after sucessful 'sign-up' user navigate to the 'profile' page.
        navigate("/profile");

      } catch (e) {
        console.log("error", e);
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      if (password != confirmPassword) {
        toast.error(
          "Please Make Sure your password and Confirm Password matches!"
        );
      } else if (password.length < 6) {
        toast.error(
          "Please Make Sure your password is more than 6 digits long!"
        );
      }
      setLoading(false);
      // throw an error
    }


  };

  //function to get the profile image.
  const displayImageHandle = (file) => {
    setProfileImage(file);
  };

  return (
    <>
      <InputComponent
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required={true}
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="text"
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text={"Upload Profile Image"}
      />

      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onClick={handleSignup}
      />
    </>
  );
}

export default SignupForm;
