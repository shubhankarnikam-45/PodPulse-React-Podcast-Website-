import React, { useEffect, useState } from 'react'

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
import Header from '../common/Header';

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



function EnquiryFormInTabularFormat() {


    const [data, setData] = useState([]);


    //here we get the all podcast data to show the 'filter output'
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "enquiry_data")),
            (querySnapshot) => {
                const enquiryData = [];
                querySnapshot.forEach((doc) => {

                    enquiryData.push({ id: doc.id, ...doc.data() });
                });

                setData(enquiryData)

            },
            (error) => {
                console.error("Error fetching enquiry data:", error);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);






    return (
        <div className='parent'>

            <Header/>
            <div className='section1'>
                <h1 style={{margin:"auto"}}>Admin</h1>
            </div>

            <div className='section2'>
                <h2>Manage Users Enquiry Forms</h2>
            </div>



            {/* table */}
            <TableContainer className='table-container' sx={{ minWidth: 700, width: 1400, margin: "auto" }} component={Paper}>
        <Table sx={{ minWidth: 700, width: 1400, margin: "auto" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align='center'> User Email</StyledTableCell>
              
              <StyledTableCell align="center">Message</StyledTableCell>


            </TableRow>
          </TableHead>


          <TableBody>
            {data.map((row) => (
              // <Link to={`/user/${row.id}`}>
              <StyledTableRow className='horizontalRow' key={row.id} >
                
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center" >
                  {row.email}
                </StyledTableCell>
                
                <StyledTableCell align="center">{row.message}</StyledTableCell>
              </StyledTableRow>
              // </Link>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
        </div >
    )
}

export default EnquiryFormInTabularFormat