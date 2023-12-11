import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ViewTable from './components/table';
import ResponsiveAppBar from './CustomerPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import MenuCoffee from './productList';
import Orders from './OrdersPage'
import Payment from './PaymentPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Customers" element={<ResponsiveAppBar />} /> {/* Render ResponsiveAppBar on the landing page */}
        <Route path="/Menu/:customerId" element={<MenuCoffee />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
