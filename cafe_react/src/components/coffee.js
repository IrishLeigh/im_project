// TheCoffee.js
import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import './coffee.css';

const TheCoffee = (props) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className='item'>
        <div className='coffeeNames'>
          <span className='coffeeName'>{props.name} <br /></span>
          <span className='coffeeDesc'>{props.desc} <br /></span>
          <div className='coffeeline'></div>
          <span className='coffeePrice'> Php{props.price}</span>
          <TextField
            type="number"
            label="Quantity"
            variant="outlined"
            size="small"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <img src={props.image} alt={props.name} className='imgCoffee' />
      </Grid>
    </Grid>
  );
};

export default TheCoffee;
