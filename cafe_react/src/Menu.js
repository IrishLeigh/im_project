import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import './product.css';
import TheCoffee from './components/coffee';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MenuBar from './components/menuBar';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Products = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [products, setProducts] = useState([]);
  const{ customerId } = useParams();

  const fetchData = async () => {
    try {
      const apiUrl = '/cafe/menu';
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);
  const handleCreateNewItem = async () => {
    try {
      const apiUrl = '/cafe/customer';

      const newItemData = {
        // Your JSON data goes here
        // Example:
        firstName: 'John',
        lastName: 'Doe',
        // Add other properties as needed
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItemData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('New item created successfully:', responseData);
    } catch (error) {
      console.error('Error creating new item:', error);
    }
  };

  const handleAddToOrder = async (data) => {
    try {
      console.log('Data before sending:', data);
      const apiUrl = '/orders';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerId,  // Fix property name
          orderDate: new Date().toISOString().split('T')[0],
          orderTime: new Date().toLocaleTimeString(),
          productId: data.productId,  // Fix property name
          quantity: data.quantity,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      alert('Item added to order successfully:', responseData);
    } catch (error) {
      console.log('Error adding item to order:', error);
    }
  };
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <>
       <AppBar position="fixed" sx={{ background: '#30271C', zIndex: 1 }}>
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
              MENU
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
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <MenuBar />
      <div
      className='menuBg'
      style={{
        backgroundImage: 'url(/cafe_menu.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '140vh', 
        paddingTop: '10px',
        zIndex: 2, 
      }}>
        <Container maxWidth="md" sx={{ mt: 2, ml: 2, marginLeft: "350px" }}>
          <div className='menuTitle'>
            <h2>Cafe Menu</h2>
            <div className='designline'></div>
          </div>

          {/* <form style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width:'105%'}}>
          <label className="inputLabel">
              Product ID:
              <input
                type="text"
                name="pID"
                className="inputField"
              />
            </label>
            <label className="inputLabel">
              Product Name:
              <input
                type="text"
                name="pName"
                className="inputField"
              />
            </label>
            <label className="inputLabel">
              Description:
              <input
                type="text"
                name="desc"
                className="inputField"
              />
            </label>
            <label className="inputLabel">
              Price:
              <input
                type="text"
                name="price"
                className="inputField"
              />
            </label>
            <label className="inputLabel">
              Image:
              <input
                type="text"
                name="image"
                className="inputField"
              />
            </label>
          <button
          type="submit"
          style={{
            marginLeft: '-5px',
            backgroundColor: '#FFFFFF',
            color: '#30271C',
            width: '31%',
            height: '35px',
            borderRadius: '10px',
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            fontWeight:'bold',
            transform:'translateX(-15%)',
          }}
          > Add Menu Item </button>
<button
  type="submit"
  style={{
    marginRight: '-69px',
    marginLeft: '10px',
    width: '30%',
    height: '35px',
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    color: '#30271C',
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontWeight:'bold'
  }}>
  Update an Item
</button>
          </form>
          <div className='designline2'></div> */}
          <Grid container spacing={2}>
            {products.map((drink, index) => (
              <Grid item xs={12} sm={6} md={4} lg={6} key={index} className='item'>
                <TheCoffee


                  name = {drink.name}
                  desc= {drink.description}
                  price={drink.price}
                  image={drink.image}
                  cID={customerId}  // Add customer ID
                  date={new Date().toISOString().split('T')[0]}  // Format the date
                  time={new Date().toLocaleTimeString()}  // Format the time
                  pID={drink.productId}
                  onAddClick={handleAddToOrder}
                />
              </Grid>
            ))}
          </Grid>
          {/* <Link to="/Orders">
            <Button style={{ backgroundColor: '#FFFFFF', color:'#30271C', fontFamily: 'Georgia, "Times New Roman", Times, serif', width:'15%', height:'37px', fontWeight:'bold',
          borderRadius:'50px', alignItems:'right', display:'flex', margin:'auto'}}>
            ORDER NOW
          </Button>
          </Link> */}

          <br/>
          <br/>
          <br/>
          <br/>
        </Container>
      </div>
    </>
  );
}

export default Products;
