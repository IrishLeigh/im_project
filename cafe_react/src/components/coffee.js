import React from 'react';
import { Grid } from '@mui/material';
import './coffee.css';

const drinkData = [
  {
    name: "Caffee Latte",
    desc: "Fresh brewed espresso and steamed milk",
    price: 120,
    image: "/caffe_latte.jpg", // Adjust the image path accordingly
  },
  {
    name: "Caffee Mocha",
    desc: "Espresso, chocolate, steamed milk, whipped cream",
    price: 120,
    image: "/caffe_mocha.jpg", // Adjust the image path accordingly
  },
  {
    name: "CAPPUCCINO",
    desc: "Espresso, and smoothed Layer of Foam",
    price: 120,
    image: "/cappuccino.jpg", // Adjust the image path accordingly
  },
  {
    name: "Caramel Macchiato",
    desc: "Espresso, steamed milk, vanilla, and caramel syrup",
    price: 120,
    image: "/caramel_macchiato.jpg", // Adjust the image path accordingly
  },
  {
    name: "Cold Brew",
    desc: "Smooth coffee brewed with cold water, served over ice and milk.",
    price: 120,
    image: "/cold_brew.jpg", // Adjust the image path accordingly
  },
];

const TheCoffee = () => {
  return (
    <Grid container spacing={2}>
      {drinkData.map((drink, index) => (
        <Grid item xs={12} sm={6} md={4} lg={6} key={index} className='item'>
          <div className='coffeeNames'>
            <span className='coffeeName'>{drink.name} <br /></span>
            <span className='coffeeDesc'>{drink.desc} <br /></span>
            <div className='coffeeline'></div>
            <span className='coffeePrice'> Php{drink.price}</span>
          </div>
          <img src={drink.image} alt={drink.name} className='imgCoffee' />
        </Grid>
      ))}
    </Grid>
  );
};

export default TheCoffee;
