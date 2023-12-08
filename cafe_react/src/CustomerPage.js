import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MenuBar from './components/menuBar';
import { Link } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
} from '@mui/material';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [menu, setMenu] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    tableNumber: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { firstName, lastName, tableNumber } = formState;
  
    const newCustomer = { fName: firstName, lName: lastName, tblNum: tableNumber };
  
    try {
      if (isEditing) {
        // Check if the new table number is already taken by another customer
        const existingCustomer = menu.find((customer) => customer.tblNum === tableNumber && customer.customerId !== editCustomer.customerId);
  
        if (existingCustomer) {
          alert(`Table ${tableNumber} is already taken. Please choose another table.`);
          return;
        }
  
        // Make a PUT request to update the existing customer
        const response = await fetch(`/cafe/customer/${editCustomer.customerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCustomer),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        // Assuming the update was successful, update the state
        alert('Customer updated successfully');
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.customerId === editCustomer.customerId ? { ...customer, ...newCustomer } : customer
          )
        );
      } else {
        // Check if the table number is already taken for a new customer
        const existingCustomer = menu.find((customer) => customer.tblNum === tableNumber);
        if (existingCustomer) {
          alert(`Table ${tableNumber} is already taken. Please choose another table.`);
          return;
        }
  
        // Make a POST request to add a new customer
        const response = await fetch('/cafe/customer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCustomer),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        // Assuming the response contains the newly created customer data
        // Update the state or perform any necessary actions with the data
        alert('Successfully added a customer');
        setCustomers([...customers, data]);
      }
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  
    // Clear the form and reset editing state
    setFormState({
      firstName: '',
      lastName: '',
      tableNumber: '',
    });
    setIsEditing(false);
    setEditCustomer(null);
  };
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    window.scroll(0, 0);

    fetch('/cafe/customer')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMenu(data);
        setCustomers(data); // Update the customers state as well
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDeleteConfirmation = (customerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');

    if (confirmDelete) {
      // User confirmed, proceed with the delete request
      deleteCustomer(customerId);
    }
  };
  const deleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`/cafe/customer/${customerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the delete was successful, update both states
      alert('Customer deleted successfully');
      setMenu(menu.filter((customer) => customer.customerId !== customerId));
      setCustomers(customers.filter((customer) => customer.customerId !== customerId));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  const handleEditCustomer = (customer) => {
    setIsEditing(true);
    setEditCustomer(customer);

    // Populate the form fields with customer information
    setFormState({
      firstName: customer.fName,
      lastName: customer.lName,
      tableNumber: customer.tblNum,
    });
  };

  return (
    <Box sx={{ background: '#A07344', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ background: '#30271C' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CUSTOMERS
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
              
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
          

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <MenuBar/>
      {/* Table Here */}
      
      <Container maxWidth="md" sx={{ mt: 2, ml: 2 ,marginLeft:"350px"}}>
        {/* Input Customer Here */}
      <div>
        <h1>Customers</h1>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={isEditing ? formState.firstName : ''}
              onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
              required
              disabled={isEditing}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={isEditing ? formState.lastName : ''}
              onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
              required
              disabled={isEditing}
            />
          </label>
          <label>
            Table Number:
            <input
              type="number"
              name="tableNumber"
              value={isEditing ? formState.tableNumber : ''}
              onChange={(e) => setFormState({ ...formState, tableNumber: e.target.value })}
              required
              
            />
          </label>
          
          <button type="submit">{isEditing ? 'Update Customer' : 'Add Customer'}</button>
        </form>

        
      </div>
      {/* Input Custoemr Ends Here */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#C02147' }}>
              <TableCell align="center" sx={{ color: 'white' }}>Customer Id.</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Customer Name</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Table Number</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {menu.map((row, key) => (
            <TableRow key={row.customerId}>
              <TableCell align="center">{row.customerId}</TableCell>
              <TableCell component="th" scope="row" align="center">
                <div style={{ display: 'flex', align: 'center' }}>
                  {row.fName} {row.lName}
                </div>
              </TableCell>
              <TableCell align="center">{row.tblNum}</TableCell>
              <TableCell align="center">
                <Button onClick={() => handleEditCustomer(row)}>Edit</Button>
                <Button onClick={() => handleDeleteConfirmation(row.customerId)}>Delete</Button>
                <Link to={`/Menu/${row.customerId}`}>
                  <Button>Order</Button>
                </Link>
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
      {/* Table Ends Here */}
    </Box>


  );
}
export default ResponsiveAppBar;
