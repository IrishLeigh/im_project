import React, { useEffect, useState } from 'react';
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


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const MenuCoffee = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
     window.scroll(0, 0);
 
     fetch('/cafe/menu')
       .then((response) => {
         if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
         }
         return response.json();
       })
       .then((data) => {
          setProducts(data);
        
       })
       .catch((error) => {
         console.error('Error fetching data:', error);
       });
   }, []);

 

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

  const drinkData = [
//     {


//       name: "Caffee Latte",
//       desc: "Fresh brewed espresso and steamed milk",
//       price: 120,
//       image: "/caffe_latte.jpg", // Adjust the image path accordingly
//     },
//     {
//       name: "Caffee Mocha",
//       desc: "Espresso, chocolate, steamed milk, whipped cream",
//       price: 120,
//       image: "/caffe_mocha.jpg", // Adjust the image path accordingly
//     },
//     {
//       name: "CAPPUCCINO",
//       desc: "Espresso, and smoothed Layer of Foam",
//       price: 120,
//       image: "/cappuccino.jpg", // Adjust the image path accordingly
//     },
//     {
//       name: "Caramel Macchiato",
//       desc: "Espresso, steamed milk, vanilla, and caramel syrup",
//       price: 120,
//       image: "/caramel_macchiato.jpg", // Adjust the image path accordingly
//     },
//     {
//       name: "Cold Brew",
//       desc: "Smooth coffee brewed with cold water, served over ice and milk.",
//       price: 120,
//       image: "/cold_brew.jpg", // Adjust the image path accordingly
//     },
  ];
console.log(products)
  return (
    <>
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
              Menu
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

      <div className='menuBg' style={{ backgroundImage: 'url(/cafe_menu.png)' }}>
        <Container maxWidth="md" sx={{ mt: 2, ml: 2, marginLeft: "350px" }}>
          <div className='menuTitle'>
            <h2>Cafe Menu</h2>
            <div className='designline'></div>
          </div>

          <Grid container spacing={2}>
            {products.map((drink, index) => (
              <Grid item xs={12} sm={6} md={4} lg={6} key={index} className='item'>
                <TheCoffee
                  name={drink.productName}
                  desc={drink.description}
                  price={drink.price}
                  image={drink.image}
                />
              </Grid>
            ))}
          </Grid>
          <Button>ORDER NOW</Button>
        </Container>
      </div>
    </>
  );
}

export default MenuCoffee;
