import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container
} from '@mui/material';

export default function ViewTable() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);

    fetch("/cafe/customer")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setMenu(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#C02147' }}>
              <TableCell align="center" sx={{ color: 'white' }}>H1</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>H2</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>H3</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>H4</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.map((row,key) => (
              <TableRow key={row.customerId}>
                <TableCell align="center">{row.customerId}</TableCell>
                <TableCell component="th" scope="row" align="center">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt={row.customerId} src="/static/images/avatar/2.jpg" sx={{ marginRight: '1rem' }} />
                    <div>
                      {row.fName} {row.lName}
                    </div>
                  </div>
                </TableCell>
                <TableCell align="center">{row.tblNum}</TableCell>
                <TableCell align="center">
                  <Button>Order</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ border: '2px', borderColor: 'black', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button>Previous</Button>
          <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>Page 1 of 1</p>
          <Button>Next</Button>
        </div>
      </div>
    </Container>
  );
}
