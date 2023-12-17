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
import { Link } from 'react-router-dom';
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

  const [editFormState, setEditFormState] = useState({
    firstName: '',
    lastName: '',
    tableNumber: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, tableNumber } = isEditing ? editFormState : formState;

    const newCustomer = { fName: firstName, lName: lastName, tblNum: tableNumber };

    try {
      if (isEditing) {
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
            customer.customerId === editCustomer.customerId
              ? { ...customer, ...newCustomer }
              : customer
          )
        );
      } else {
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
    setEditFormState({
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
  }, [isEditing]);



  const deleteCustomer = async (customerId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
  
      if (!confirmDelete) {
        return; // If the user cancels the delete, do nothing
      }
  
      const response = await fetch(`/cafe/customer/${customerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        // If the delete operation fails, alert the error message from the API
        const errorMessage = await response.text();
        alert(`Customer has existing orders. Check the status of the order`);
        return;
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
    setEditFormState({
      firstName: customer.fName,
      lastName: customer.lName,
      tableNumber: customer.tblNum,
    });
  };

  return (
    <Box sx={{ background: '#A07344', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ background: '#30271C' }}>
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
        <h1 style={{marginTop:'64px', textAlign:'center', marginBottom:'50px', transform:'translateY(35%)',  fontFamily: 'Georgia, "Times New Roman", Times, serif', color:'#FFFFFF'}}>Customers</h1>
        <form onSubmit={handleSubmit}>
          <label style={{color:'#FFFFFF', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontSize:'16px'}}>
            First Name:
            <input
              type="text"
              name="firstName"
              style= {{marginLeft:'15px',marginRight:'15px', fontFamily: 'Georgia, "Times New Roman", Times, serif',fontSize:'14px',height:'20px'}}
              value={isEditing ? editFormState.firstName : formState.firstName}
              onChange={(e) => (isEditing ? setEditFormState({ ...editFormState, firstName: e.target.value }) : setFormState({ ...formState, firstName: e.target.value }))}
              required
              disabled={isEditing}
            />
          </label>
          <label style={{color:'#FFFFFF', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontSize:'16px'}}>
            Last Name:
            <input
              type="text"
              name="lastName"
              style= {{marginLeft:'15px',marginRight:'15px', fontFamily: 'Georgia, "Times New Roman", Times, serif',fontSize:'14px', height:'20px'}}
              value={isEditing ? editFormState.lastName : formState.lastName}
              onChange={(e) => (isEditing ? setEditFormState({ ...editFormState, lastName: e.target.value }) : setFormState({ ...formState, lastName: e.target.value }))}
              required
              disabled={isEditing}
            />
          </label>
          <label style={{color:'#FFFFFF', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontSize:'16px',}}>
            Table Number:
            <input
              type="number"
              name="tableNumber"
              style= {{marginLeft:'15px',marginRight:'15px', fontFamily: 'Georgia, "Times New Roman", Times, serif',fontSize:'14px',height:'20px'}}
              value={isEditing ? editFormState.tableNumber : formState.tableNumber}
              onChange={(e) => (isEditing ? setEditFormState({ ...editFormState, tableNumber: e.target.value }) : setFormState({ ...formState, tableNumber: e.target.value }))}
              required
            />
          </label>
          
          <button type="submit" style={{
            backgroundColor: '#F7DBBE',
            color: '#30271C',
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            width: '15%',
            height: '35px',
            fontWeight: 'bold',
            borderRadius: '50px',
            border: '2px solid #30271C',
            textAlign: 'center',
            marginTop: '13px',
            marginBottom: '13px',
            marginLeft: 'auto',  
            display: 'block',   
          }}>{isEditing ? 'Update Customer' : 'Add Customer'}</button>
        </form>
      </div>

      {/* Input Custoemr Ends Here */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#30271C' }}>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontSize:'16px' }}>Customer Id.</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontSize:'16px' }}>Customer Name</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontSize:'16px' }}>Table Number</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontSize:'16px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {menu
            .filter(row => !row.isPaid) // Filter rows where isPaid is not TRUE
            .map((row, key) => (
            <TableRow key={row.customerId}>
              <TableCell align="center" style={{backgroundColor:'#C7A17A', color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif',}}>{row.customerId}</TableCell>
              <TableCell component="th" scope="row" align="center">
                <div style={{ display: 'flex', align: 'center', backgroundColor:'#C7A17A', color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif', }}>
                  {row.fName} {row.lName}
                </div>
              </TableCell>
              <TableCell align="center"  style={{backgroundColor:'#C7A17A', color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif',}}>{row.tblNum}</TableCell>
              <TableCell align="center"  style={{backgroundColor:'#C7A17A', color:'#30271C',}}>
                <Button style={{color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif'}} onClick={() => handleEditCustomer(row)}>Edit</Button>
                <Button style={{color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif'}} onClick={() => deleteCustomer(row.customerId)}>Delete</Button>
                <Link to={`/Menu/${row.customerId}`}>
                  <Button style={{color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif'}}>Order</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}

          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ border: '2px', borderColor: 'black', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', color:'#FFFFFF', 
          fontSize:'14px', backgroundColor:'#30271C', fontWeight:'bold'}}>Previous</Button>
          <p style={{ marginLeft: 'auto', marginRight: 'auto', color:'#FFFFFF', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontSize:'18px'}}>Page 1 of 1</p>
          <Button style={{color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif', 
          backgroundColor:'#FFFFFF', fontSize:'14px', fontWeight:'bold'}}>Next</Button>
        </div>
      </div>
      </Container>
      {/* Table Ends Here */}
    </Box>


  );
}
export default ResponsiveAppBar;
