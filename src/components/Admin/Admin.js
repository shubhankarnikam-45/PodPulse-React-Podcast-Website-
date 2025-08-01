import React, { useEffect, useState } from 'react'
import "./styles.css"
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import image from "../../assets/delete.png"

import { setAdminState } from '../../slices/adminSlice';
import { useDispatch } from 'react-redux';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import DateRangePicker from '../common/DateTimePicker/DateRangePicker';
// import { Timestamp } from 'firebase/firestore'
import firebase from 'firebase/compat/app';
import { Timestamp } from 'firebase/firestore';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



function Admin() {


  const [data, setData] = useState([]);

  //overalll data.
  const [overallData, setOverallData] = useState([]);

  //to check the date picker empty or not.
  const [datePickerEmptyOrNot, setDatePickerEmptyOrNot] = useState(false);

  const [filteredUsers, setFilteredUsers] = useState([]);

  // console.log("filerted data", filteredUsers)
  // console.log("user dataa", data);
  // console.log("overall datta", overallData)

  // console.log("date time pekcer", datePickerEmptyOrNot)
  //getting the current date from the 'timestamp'.
  // console.log("current date",data[0].registrationDate.toDate());
  //dispatch function.
  const dispatch = useDispatch();




  //this function handles the filter functinality.
  async function onDateRangeChange(startDate, endDate) {
    // console.log("sd", startDate)
    // console.log("ed", endDate)
    try {

      const date1 = new Date(startDate);
      const date2 = new Date(endDate);


      // Convert JavaScript Date objects to Firestore Timestamp objects
      // const myTimestamp = Timestamp.fromDate(startDate);
      // console.log("start date", date1);
      // console.log("end date", date2);

      const startDateTimestamp = Timestamp.fromDate(date1);
      const endDateTimestamp = Timestamp.fromDate(date2);


      // console.log("start date", startDateTimestamp);
      // console.log("end date", endDateTimestamp);
      const q = query(collection(db, 'users'), where('registrationDate', '>=', startDateTimestamp), where('registrationDate', '<=', endDateTimestamp));
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
    // console.log("filter data is triggered.")
    // console.log("isze", filteredUsers.length);
    if (filteredUsers.length != 0) {
      setData(filteredUsers);
    }
    else if (datePickerEmptyOrNot == true) {
      setData(overallData);
    }
    else {
      setData([]);
    }
  }, [filteredUsers])

  const navigate = useNavigate()
  //here we get the all podcast data to show the 'filter output'
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "users")),
      (querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {

          userData.push({ id: doc.id, ...doc.data() });
        });
        setOverallData(userData);
        setData(userData)

      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  //logot function.
  function handleLogout() {
    dispatch(setAdminState(false));
  }

  //function in which user can delete.
  function handleDeleteUser(e, id) {
    e.stopPropagation();
    // Specify the collection and document ID of the document you want to delete
    const docRef = doc(db, "users", id);


    // Delete the document
    deleteDoc(docRef)
      .then(() => {
        console.log("document deleted...");
      })

    //delete the authenticated user.
    // getAuth()
    //   .deleteUser(id)
    //   .then(() => {
    //     console.log('Successfully deleted user');
    //   })
    //   .catch((error) => {
    //     console.log('Error deleting user:', error);
    //   });

  }

  //when admin click on the row.
  function handleRowClick(id) {
    // console.log("row is clicked.", id);
    navigate(`/user/${id}`)
  }

  function handleEnquiryUsers() {
    //after clicking on this function we navigate to the user enquiry form
    navigate("/enquiry-form-table-format");
  }

  //after clicking on user podcast view.
  function handlePodcastView() {
    navigate("/podcast-view-for-admin")
  }
  return (
    <div className='parent'>
      <div className='section1'>
        <Button style={{ backgroundColor: "pink" }} onClick={handleEnquiryUsers} text={"Enquiry Form Details"} width={140} height={10} bcolor={"red"} />
        <Button style={{ backgroundColor: "pink" }} onClick={handlePodcastView} text={"User Podcasts View"} width={140} height={10} bcolor={"red"} />
        <h1>Admin</h1>
        <Button text={"Logout"} onClick={handleLogout} width={140} height={10} />
      </div>

      <div className='section2'>
        <h2>Manage Users</h2>
        <div>
          <span className='apply-filter'>Apply Filter</span>
          <DateRangePicker onDateRangeChange={onDateRangeChange} setDatePickerEmptyOrNot={setDatePickerEmptyOrNot} />

        </div>

      </div>



      {/* table */}
      <TableContainer className='table-container' sx={{ minWidth: 700, width: 1400, margin: "auto" }} component={Paper}>
        <Table sx={{ minWidth: 700, width: 1400, margin: "auto" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> User Email</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              {/* <StyledTableCell align="right">User ID</StyledTableCell> */}
              <StyledTableCell align="right">Profile Image</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Detele Profile</StyledTableCell>


            </TableRow>
          </TableHead>


          <TableBody>
            {data.map((row) => (
              // <Link to={`/user/${row.id}`}>
              <StyledTableRow className='horizontalRow' key={row.id} onClick={() => handleRowClick(row.id)}>
                <StyledTableCell component="th" scope="row">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                {/* <StyledTableCell align="right">{row.uid}</StyledTableCell> */}
                {/* <StyledTableCell align="right"><a href={row.proImg} target="_blank">Profile Image</a></StyledTableCell> */}
                <StyledTableCell align="right">
                  <a href={row.proImg} target="_blank" onClick={(e) => {
                    e.stopPropagation();  // Prevents the event from propagating to the row
                    e.preventDefault();   // Prevents the default behavior
                    window.open(row.proImg, '_blank');  // Opens the link in a new tab
                  }}>Profile Image</a>
                </StyledTableCell>

                <StyledTableCell align="right">{row.registrationDate.toDate().toLocaleString()}</StyledTableCell>
                <StyledTableCell align="right" onClick={(e) => handleDeleteUser(e, row.id)}><img src={image} alt='img' /></StyledTableCell>
              </StyledTableRow>
              // </Link>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div >
  )
}

export default Admin