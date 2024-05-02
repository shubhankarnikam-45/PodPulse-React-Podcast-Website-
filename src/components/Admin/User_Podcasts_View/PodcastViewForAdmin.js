import { Timestamp, collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


import "./styles.css"

import DateRangePicker from '../../common/DateTimePicker/DateRangePicker';
import { db } from '../../../firebase';
import PodcastCard from '../../Podcasts/PodcastCard';
import Header from '../../common/Header';



function PodcastViewForAdmin() {

  const [data, setData] = useState([]);

  //overalll data.
  const [overallData, setOverallData] = useState([]);

  //to check the date picker empty or not.
  const [datePickerEmptyOrNot, setDatePickerEmptyOrNot] = useState(false);

  const [filteredUsers, setFilteredUsers] = useState([]);

  //here we gettting the user ID which we want to show podcasts.
  const { id } = useParams();

  const [currUserPodcasts, setCurrUserPodcasts] = useState([]);

  console.log("filtered podcasts",currUserPodcasts)

  console.log("signal", datePickerEmptyOrNot)

  console.log("overall data", overallData);


  //this if for current user all podcasts.
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {



        //   if (doc.data().createdBy === id) {

            podcastsData.push({ id: doc.id, ...doc.data() });
        //   }
          setCurrUserPodcasts(podcastsData);
          setOverallData(podcastsData);

          console.log("podcast data", podcastsData)

        });

      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

   //this function handles the filter functinality.
   async function onDateRangeChange(startDate, endDate) {
    console.log("sd", startDate)
    console.log("ed", endDate)
    try {

      const date1 = new Date(startDate);
      const date2 = new Date(endDate);


      // Convert JavaScript Date objects to Firestore Timestamp objects
      // const myTimestamp = Timestamp.fromDate(startDate);
      console.log("start date", date1);
      console.log("end date", date2);

      const startDateTimestamp = Timestamp.fromDate(date1);
      const endDateTimestamp = Timestamp.fromDate(date2);


      console.log("start date", startDateTimestamp);
      console.log("end date", endDateTimestamp);
      const q = query(collection(db, 'podcasts'), where('dateCreated', '>=', startDateTimestamp), where('dateCreated', '<=', endDateTimestamp));
      const querySnapshot = await onSnapshot(q, (snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setFilteredUsers(users);
        // setData(users);
      });
    } catch (error) {
      console.error("Error filtering users:", error);
    }

  }


     //when date time picker change.
     useEffect(() => {
      console.log("filter data is triggered.")
      console.log("isze", filteredUsers.length);
      if (filteredUsers.length != 0) {
        setCurrUserPodcasts(filteredUsers);
      }
      else if(datePickerEmptyOrNot == true)
      {
        setCurrUserPodcasts(overallData);
      }
      else
      {
        setCurrUserPodcasts([]);
      }
    }, [filteredUsers, datePickerEmptyOrNot])
  

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

  return (
    <div className='parent-div'>
      <Header />
      <div className='section2'>
        <h2>Manage Podcasts</h2>
        <div>
          <span className='apply-filter'>Apply Filter</span>
          <DateRangePicker onDateRangeChange={onDateRangeChange} setDatePickerEmptyOrNot={setDatePickerEmptyOrNot} />

        </div>

      </div>

      <div className='inner-div'>
        {/* Content for the second section */}

        <div>
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
                  authorName={item.nameOfUser}
                  onClick={(e) => handleDelete(e, item.id)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodcastViewForAdmin