import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Header from '../common/Header';
// import firebase from 'firebase/compat/app';
import { auth, db } from '../../firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';


const EnquiryForm = () => {
  
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  //user date for enter enquiry.
  const enquiryDateTime = new Date();

  //here we getting the current user by using the firebase datastore.
  const currentUser = auth.currentUser;

  console.log("current user",currentUser)
  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     setUser(user);
  //   });

  //   return () => unsubscribe();
  // }, []);

  const formStyle = {
    marginTop:"80px",
    maxWidth: 400,
    color:'black',
    margin: 'auto',
    padding: 16,
    border: '1px solid #3A4660',
    borderRadius: 4,
    backgroundColor: '#FFFFFF'
  };

  const inputStyle = {
    marginBottom: 16,
  };

  const successMessageStyle = {
    color: '#4CAF50',
    marginTop: 16,
  };

  const errorMessageStyle = {
    color: '#F44336',
    marginTop: 16,
  };

  //for getting the current user name we use below function from firebase.
  // Function to search for documents with matching UID
async function searchUserByUID(uid) {
  
  try {
    
    // const snapshot = await db.collection('users').where('uid', '==', uid).get();
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    const snapshot = await getDocs(q);
    

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach(doc => {
      // console.log(doc.id, '=>', doc.data().name);
      const userName = doc.data().name;
      setName(userName);
    });
  } catch (error) {
    console.error('Error searching for user:', error);
  }
}
//useEffect to get name,
useEffect(()=>{
  searchUserByUID(currentUser.uid);
},[])



  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!message) {
      toast.error("Please Enter Message to Submit Form")
      return;
    }

    if(currentUser)
    {
      const enquiryData = {
        name:name,
        email : currentUser.email,
        userId:currentUser.uid,
        message:message,
        enquiryDateTime:enquiryDateTime
      }

      //here we adding the data into the database.
    const docRef = await addDoc(collection(db, "enquiry_data"), enquiryData);
    // setSuccessMessage()
    toast.success("successfully added in watchlist")
    setMessage("");

    }
    
    
    
    
    
  };

  if (!currentUser) {
    return <Typography>Please log in to submit an enquiry.</Typography>;
  }

  return (
    <div>
      
      <Header />
      <div style={formStyle}>

        <h1 style={{textAlign:"center"}}>Enquiry Form</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            style={inputStyle}
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
        {successMessage && <Typography style={successMessageStyle}>{successMessage}</Typography>}
        {errorMessage && <Typography style={errorMessageStyle}>{errorMessage}</Typography>}
      </div>
    </div>

  );
};

export default EnquiryForm;
