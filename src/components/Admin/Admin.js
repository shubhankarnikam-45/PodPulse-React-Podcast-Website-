import React, { useEffect, useState } from 'react'
import "./styles.css"
import { collection, onSnapshot, query } from 'firebase/firestore';
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
import { useNavigate } from 'react-router-dom';
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
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Admin() {
  const [data, setData] = useState([]);

  //dispatch function.
  const dispatch = useDispatch();

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
        setData(userData);

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
  return (
    <div className='parent'>
      <div className='section1'>
        <h1>Admin</h1>
        <Button text={"Logout"} onClick={handleLogout} width={140} height={10} />
      </div>

      <h2>Manage Users</h2>

      {/* table */}
      <TableContainer className='table-container' sx={{ minWidth: 700, width: 1400, margin: "auto" }} component={Paper}>
        <Table sx={{ minWidth: 700, width: 1400, margin: "auto" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> User Email</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">User ID</StyledTableCell>
              <StyledTableCell align="right">Profile Image</StyledTableCell>
              <StyledTableCell align="right">Detele Profile</StyledTableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.id}</StyledTableCell>
                <StyledTableCell align="right"><a href={row.proImg}>Profile Image</a></StyledTableCell>
                <StyledTableCell align="right"><img src={image} alt='img' /></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div >
  )
}

export default Admin