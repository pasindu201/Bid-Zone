import React, { useState, useEffect } from 'react'
import Product from './components/Product'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import ProductDetail from './components/ProductDetail'
import SearchItem from './components/SearchItem'
import Cart from './components/Cart'
import SellNewItem from './components/NewItem'
import SignInPage from './components/registerPage/Register'
import LogInPage from './components/loginPage/Login'
import axios from 'axios'

const App = () => {
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/items/all`);
            setItems(response.data);
            setData(...items);
            console.log('Success Request, Workouts:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  return (
    <>
    <Router>
    <Routes>
      <Route path="/home/:userName" element={<Product cart={cart} setCart={setCart} items={items} />} />
      <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} setData={setData}/>} />
      <Route path="/search/:term" element={<SearchItem cart={cart} setCart={setCart} setData={setData}/>} />
      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} setData={setData}/>} />
      <Route path="/sell/:userName" element={<SellNewItem cart={cart} setCart={setCart} setData={setData}/>} />
      <Route path="/" element={<LogInPage />} /> 
      <Route path="/register" element={<SignInPage />} />
    </Routes>
  
    </Router>
    </>
  )
}

export default App