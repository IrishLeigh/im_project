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

const settings = [ 'Logout'];

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
        firstName: '',
        lastName: '',
        tableNumber: '',
        productId: '',
        productName: '',
        quantity: '',
        orderTime: '',
        status: '',
      });
      setEditOrder(null);
    } catch (error) {
      console.error('Error handling update:', error);
    }
  };
  
  const handleServeNow = async (orderId) => {
    try {
      // Find the order with the given orderId
      const orderToServe = orders.find((order) => order.orderId === orderId);
  
      // Check if the order is already served
      if (orderToServe && orderToServe.status === 'Served') {
        // Display a message or prevent serving the order again
        alert('This order is already served.');
        return;
      }
  
      // Make a PUT request to update the status to "Served"
      const response = await fetch(`/orders/status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Served',
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Assuming the update was successful, update the state
      alert('Order served successfully');
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: 'Served' } : order
        )
      );
    } catch (error) {
      console.error('Error serving order:', error);
    }
  };
  const handleDeleteOrder = (orderId) => {
    // Find the order with the given orderId
    const orderToDelete = orders.find((order) => order.orderId === orderId);
  
    // Check if the order status is 'Served'
    if (orderToDelete && orderToDelete.status === 'Served') {
      // Display a message or prevent the deletion
      alert('Cannot delete a served order.');
      return;
    }
  
    // Display a confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
  
    if (confirmDelete) {
      // Call the delete API if the user confirms
      fetch(`/orders/${orderId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          // Assuming the delete was successful, update the state
          alert('Order deleted successfully');
          setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
        })
        .catch((error) => {
          console.error('Error deleting order:', error);
        });
    }
  };
  

console.log(orders)
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
      <div style={{backgroundColor:'#A07344'}}>
        <h1 style={{marginTop:'64px', textAlign:'center', marginBottom:'50px', transform:'translateY(35%)',  fontFamily: 'Georgia, "Times New Roman", Times, serif', color:'#FFFFFF'}}>Orders</h1>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          // Handle your form submission logic here, you can add the logic to update the order
          // based on the form state or perform any other necessary actions.
        }}>
          <label style={{color:'#FFFFFF', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontSize:'16px'}}>
            Customer Name:
            <input
              type="text"
              name="cName"
              value={`${formState.firstName} ${formState.lastName}`}
              style= {{marginLeft:'5px',marginRight:'15px', color:'#FFFFFF', fontFamily: 'Georgia, "Times New Roman", Times, serif',fontSize:'14px'}}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(' ');
                setFormState({ ...formState, firstName, lastName });
              }}
              required
              disabled={true}
            />
          </label>
          <label style={{color:'#FFFFFF', fontFamily: 'Georgia, "Times New Roman", Times, serif',fontSize:'16px' }}>
            Table Number:
            <input
              type="number"
              name="tblNum"
              value={formState.tableNumber}  // Change here
              style= {{marginLeft:'5px',marginRight:'15px', color:'#FFFFFF', fontFamily: 'Georgia, "Times New Roman", Times, serif', width:'6.5%', fontSize:'14px'}}
              onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
              required
              disabled={true}
            />
          </label>
          <label style={{color:'#FFFFFF', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontSize:'16px'}}>
            Product ID:
            <input
              type="number"
              name="pid"
              value={formState.productId}  // Change here
              style= {{marginLeft:'5px',marginRight:'15px', fontFamily: 'Georgia, "Times New Roman", Times, serif',width:'9%',fontSize:'14px'}}
              onChange={(e) => setFormState({ ...formState, productId: e.target.value })}
              required
            />
          </label>
          <label style={{color:'#FFFFFF', fontFamily: 'Georgia, "Times New Roman", Times, serif',fontSize:'16px' }}>
           Quantity:
            <input
              type="number"
              value={formState.quantity}  // Change here
              style= {{marginLeft:'5px',marginRight:'15px', fontFamily: 'Georgia, "Times New Roman", Times, serif',width:'9%',fontSize:'14px'}}
              onChange={(e) => setFormState({ ...formState, quantity: e.target.value })}
              required
              
            />
          </label>
          
          <button onClick={handleUpdate}   style={{
            backgroundColor: '#F7DBBE',
            color: '#30271C',
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            width: '13%',
            height: '35px',
            fontWeight: 'bold',
            borderRadius: '50px',
            border: '2px solid #30271C',
            textAlign: 'center',
            marginTop: '13px',
            marginBottom: '13px',
            marginLeft: 'auto',  
            display: 'block',   
          }}>Update Order</button>

        </form>

        
      </div>
      {/* Input Custoemr Ends Here */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#30271C'}}>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>Order Id.</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>Customer Name</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>Table Number</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>Time</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>Date</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>Product ID</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>Product Name</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>Quantity</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>Status</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontFamily: 'Georgia, "Times New Roman", Times, serif' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {orders
          .filter(row => !row.isPaid) // Filter rows where isPaid is not TRUE
          .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) // Sort in descending order based on order date (most recent first)
          .map((row, key) => (
            <TableRow key={row.orderId}>
              <TableCell align="center">{row.orderId}</TableCell>
              <TableCell component="th" scope="row" align="center">
                <div style={{ display: 'flex', align: 'center' }}>
                  {row.fName} {row.lName}
                </div>
              </TableCell>
              <TableCell align="center" style={{backgroundColor:'#C7A17A', color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif',}}>{row.tblNum}</TableCell>
              <TableCell align="center" style={{backgroundColor:'#C7A17A', color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif',}}>{row.orderTime}</TableCell>
              <TableCell align="center" style={{backgroundColor:'#C7A17A', color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif',}}>{row.orderDate}</TableCell>
              <TableCell align="center" style={{backgroundColor:'#C7A17A', color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif',}}>{row.productId}</TableCell>
              <TableCell align="center" style={{backgroundColor:'#C7A17A', color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif',}}>{row.productName}</TableCell>
              <TableCell align="center" style={{backgroundColor:'#C7A17A', color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif',}}>{row.quantity}</TableCell>
              <TableCell align="center" style={{backgroundColor:'#C7A17A', color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif',}}>{row.status}</TableCell>
              <TableCell align="center">
                <Button style={{color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif'}} onClick={() => handleEditOrder(row)}>Edit</Button>
                <Button style={{color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif'}} onClick={() => handleDeleteOrder(row.orderId)}>Delete</Button>
                <Button style={{color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif'}} onClick={() => handleServeNow(row.orderId)}>Serve Now</Button>
              </TableCell>
            </TableRow>
          ))}

          </TableBody>
        </Table>
      </TableContainer>
      
      </Container>
      {/* Table Ends Here */}
    </Box>


  );
}
export default Orders;
