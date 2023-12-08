import React from 'react';
//import { Grid } from '@mui/material';
import './product.css'; 
import TheCoffee from '../components/coffee';

const MenuCoffee= () =>{
     return(
        <div className='menuBg'style={{ backgroundImage: 'url(/cafe_menu.png)'}} >
        <div className='menuTitle'> <h2>Cafe Menu</h2>
        <div className='designline'></div>
        </div>
        <div>
        <TheCoffee/>
        </div>
      </div>
     )
}
export default MenuCoffee