// TheCoffee.js
import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import './coffee.css';
import { Button } from '@mui/material';

const TheCoffee = (props) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddClick = () => {
    // Invoke the callback with the relevant data
    props.onAddClick({
      customerId: props.cID,
      orderDate: props.date,
      orderTime: props.time,
      productId: props.pID,
      quantity: quantity,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className='item'>
        <div className='coffeeNames'>
          <span className='coffeeName'>{props.name} <br /></span>
          <span className='coffeeDesc'>{props.desc} <br /></span>
          <div className='coffeeline'></div>
          <span className='coffeePrice'>Php 156{props.price}</span>
          
          <TextField
            type="number"
            label="Quantity"
            variant="outlined"
            size="small"
            value={quantity}
            onChange={handleQuantityChange}
            style={{backgroundColor:' rgba(255, 255, 255, 0.3)', width:'30%', borderRadius:'5px',transform:'translateX(40%)',marginTop:'3px'}}
          />
           <Button variant="contained" color="primary" onClick={handleAddClick} style={{color:'#A07344', backgroundColor:'#FFFFFF', width:'25%', marginLeft:'3px', transform:'translateX(75%)', fontWeight:'bold', fontFamily:'Georgia, Times New Roman, Times, serif'
          ,marginTop:'3px'}}>
              Add
          </Button>
        </div>
        <img src={`/${props.image}`} alt={props.name} className='imgCoffee' />
      </Grid>
    </Grid>
  );
};

export default TheCoffee;
