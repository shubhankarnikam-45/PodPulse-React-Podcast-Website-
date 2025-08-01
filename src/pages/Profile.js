
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";

import { setCurrentUserPodcasts } from "../slices/currentUserPodcastSlice";
import "./Profile.css"
import PodcastCard from "../components/Podcasts/PodcastCard";
function Profile() {

  const [photoURL, setPhotoURL] = useState('')



  //dispatch.
  const dispatch = useDispatch();
  const user1 = auth.currentUser;


  //this is for the getting the 'current user details'.
  const currUserPodcasts = useSelector((state) => state.currentUserPodcasts.currentUserPodcasts);



  //this if for current user all podcasts.
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {

          
          
          if (doc.data().createdBy === user1.uid) {
            
            podcastsData.push({ id: doc.id, ...doc.data() });
          }

        });
        dispatch(setCurrentUserPodcasts(podcastsData));
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);



  //this is for
  useEffect(() => {
    async function fun() {
      const userDoc = await getDoc(doc(db, "users", user1.uid));
      const userData = userDoc.data();

      
      setPhotoURL(userDoc.data().proImg);
    }
    fun();
  }, [photoURL]);

  //this is redux method to get the state.
  const user = useSelector((state) => state.user.user);


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

  //when user click on the delete butotn.
  const handleDelete = async (e, item) => {
    e.stopPropagation();
    // const d = query(collection(db, 'podcasts'), where('id', '==', item));
    // console.log("docsnap", d)
    // const docSnap = await getDocs(d);

    const docRef = doc(db, "podcasts", item);

    // docSnap.forEach((doc) => {
    //   console.log("docuement datataataataa", doc.data())
    //   deleteDoc(doc.ref);
    // });

    try {
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }

  }

  //when user click on edit button.
  const handleEditInfo = ()=>{
    toast.info("We Currently Working on this feature :)",{
      position: "top-left",
    })
  }
  return (

    <div className="parent-div">
      <Header />
      <div className="container">
        {/* <Header/> */}
        <div className="section">
          {/* Content for the first section */}
          <h1>My Profile</h1>
          <div className="input-wrapper-profile-page" >
            <div className="profilePic">
              <img src={photoURL} alt="profilePicture" />
              <div><Button onClick ={handleEditInfo} text={"Edit Image"} width={"90px"} height={"1px"}></Button></div>
            </div>

            <div className="inner-field-profile">
              <div className="profile-content-div">
              <h1><strong style={{ color: "wheat" }}>Name</strong>  : {user.name}</h1> 
              <div><Button onClick ={handleEditInfo} text={"Edit  Name"} width={"90px"} height={"1px"}>Edit</Button></div>
              </div>
              
              <div className="profile-content-div">
              <h1><strong style={{ color: "wheat" }}>Email</strong> : {user.email}</h1>
              <div><Button onClick ={handleEditInfo} text={"Edit Email"} width={"90px"} height={"1px"}>Edfit</Button></div>
              </div>
              
              {/* <div className="profile-content-div">
              <h1><strong style={{ color: "wheat" }}>User Id</strong> : {user.uid}</h1>
              <div><Button text={"Edit"} width={"20px"} height={"1px"}>Edit</Button></div>
              </div> */}
              
            </div>
            <Button text={"Logout"} onClick={handleLogout} width={300} />
          </div>
          {/* Add your content here */}
        </div>

        <div className="scrollable">
          {/* Content for the second section */}
          <h1>My Podcasts</h1>
          <div className="scrollable-content">
            {/* Scrollable content */}
            {/* Add your scrollable content here */}
            {/* For demonstration, adding a long list */}
            <div className="podcasts-flex" style={{ marginTop: "1.5rem" }}>
              {currUserPodcasts.map((item) => {
                return (
                  <PodcastCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    displayImage={item.displayImage}
                    text={"delete"}
                    onClick={(e) => handleDelete(e, item.id)}
                    dateCreated={item.dateCreated} 
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>




    // <div>
    //   <Header />
    //   <div className="input-wrapper" >
    //     <div className="profilePic">
    //       <img src={photoURL} alt="profilePicture" />
    //     </div>
    //     <div className="inner-field-profile">
    //       <h1><strong style={{ color: "wheat" }}>Name</strong>  : {user.name}</h1>
    //       <h1><strong style={{ color: "wheat" }}>Email</strong> : {user.email}</h1>
    //       <h1><strong style={{ color: "wheat" }}>User Id</strong> : {user.uid}</h1>
    //     </div>
    //     <Button text={"Logout"} onClick={handleLogout} width={300} />
    //   </div>
    // </div>
  );
}

export default Profile;





