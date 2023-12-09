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

function Orders() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    tableNumber: '',
    productId: '',  // Add these fields
    productName: '', // Add these fields
    quantity: '',
    orderTime:'', // Add these fields
    status:''
  });
  


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
  
    fetch('/orders')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data); // Update the orders state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleEditOrder = (order) => {
    setEditOrder(order);

    // Populate the form fields with order information
    setFormState({
      firstName: order.fName,
      lastName: order.lName,
      tableNumber: order.tblNum,
      productId: order.productId,
      productName: order.productName,
      quantity: order.quantity,
    });
  };
  const handleUpdate = async () => {
    try {
      // Validate form fields
      if (!formState.productId || !formState.quantity) {
        alert('Please fill in all required fields.');
        return;
      }
  
      const updatedOrder = {
        productId: formState.productId,
        quantity: formState.quantity,
        // Add any additional fields here
      };
  
      // Make a PUT request to update the existing order
      const response = await fetch(`/orders/${editOrder.orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Assuming the update was successful, update the state
      alert('Order updated successfully');
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === editOrder.orderId ? { ...order, ...updatedOrder } : order
        )
      );
  
      // Clear the form and reset editing state
      setFormState({
        productId: '',
        productName: '',
        quantity: '',
        orderTime: '',
        orderDate: '',
        status: '',
      });
      setEditOrder(null);
    } catch (error) {
      console.error('Error handling update:', error);
    }
  };

console.log(orders)
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
              ORDERS
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
        <h1>Orders</h1>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          // Handle your form submission logic here, you can add the logic to update the order
          // based on the form state or perform any other necessary actions.
        }}>
          <label>
            Customer Name:
            <input
              type="text"
              name="cName"
              value={`${formState.firstName} ${formState.lastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(' ');
                setFormState({ ...formState, firstName, lastName });
              }}
              required
              disabled={true}
            />
          </label>
          <label>
            Table Number:
            <input
              type="number"
              name="tblNum"
              value={formState.tableNumber}  // Change here
              onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
              required
              disabled={true}
            />
          </label>
          <label>
            Product ID:
            <input
              type="number"
              name="pid"
              value={formState.productId}  // Change here
              onChange={(e) => setFormState({ ...formState, productId: e.target.value })}
              required
            />
          </label>
          <label>
           Quantity
            <input
              type="number"
              value={formState.quantity}  // Change here
              onChange={(e) => setFormState({ ...formState, quantity: e.target.value })}
              required
              
            />
          </label>
          
          <button onClick={handleUpdate}>Update Order</button>

        </form>

        
      </div>
      {/* Input Custoemr Ends Here */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#C02147' }}>
              <TableCell align="center" sx={{ color: 'white' }}>Order Id.</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Customer Name</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Table Number</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Time</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Date</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Product ID</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Product Name</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Quantity</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Status</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {orders.map((row, key) => (
            <TableRow key={row.orderId}>
              <TableCell align="center">{row.orderId}</TableCell>
              <TableCell component="th" scope="row" align="center">
                <div style={{ display: 'flex', align: 'center' }}>
                  {row.fName} {row.lName}
                </div>
              </TableCell>
              <TableCell align="center">{row.tblNum}</TableCell>
              <TableCell align="center">{row.orderTime}</TableCell>
              <TableCell align="center">{row.orderDate}</TableCell>
              <TableCell align="center">{row.productId}</TableCell>
              <TableCell align="center">{row.productName}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">
                <Button onClick={() => handleEditOrder(row)}>Edit</Button>
                <Button >Delete</Button>
                <Button>Serve Now</Button>
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
export default Orders;
