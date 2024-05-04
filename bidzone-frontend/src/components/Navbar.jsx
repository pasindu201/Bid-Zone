import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { items } from './Data';
import { BsFillCartCheckFill } from 'react-icons/bs';

const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create a state variable to hold the selected maximum price
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');

  const filterByCategory = (category) => {
    const filteredItems = items.filter((product) => product.category === category);
    setData(filteredItems);
  };

  const filterByPrice = (price) => {
    const filteredItems = items.filter((product) => product.price <= price);
    setData(filteredItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <>
      <header className="sticky-top">
        <div className="nav-bar">
          <Link to="/" className="brand">BidZone</Link>

          <form onSubmit={handleSubmit} className="search-bar">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products"
            />
          </form>

          <Link to="/cart" className="cart">
            <button type="button" className="btn btn-primary position-relative">
              <BsFillCartCheckFill style={{ fontSize: '1.5rem' }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
        </div>

        {location.pathname === '/' && (
          <div className="nav-bar-wrapper">
            <div onClick={() => setData(items)} className="items">No Filter</div>
            <div onClick={() => filterByCategory('electronics')} className="items">Electronics</div>
            <div onClick={() => filterByCategory('sports')} className="items">Sports & Outdoors</div>
            <div onClick={() => filterByCategory('books')} className="items">Books & Media</div>
            <div onClick={() => filterByCategory('vihicles')} className="items">Vihicles</div>
            <div onClick={() => filterByCategory('home')} className="items">Home & Garden</div>
            <div onClick={() => filterByCategory('lands')} className="items">Lands</div>

            {/* Dropdown for selecting max price */}
            <select
              className="form-select items"
              value={selectedMaxPrice}
              onChange={(e) => {
                const maxPrice = e.target.value;
                setSelectedMaxPrice(maxPrice);
                filterByPrice(Number(maxPrice));
              }}
              style={{ width: '200px' }}
            >             
              <option value="">Select Max Price</option>
              <option value="29999">Up to 29,999 LKR</option>
              <option value="49999">Up to 49,999 LKR</option>
              <option value="69999">Up to 69,999 LKR</option>
              <option value="89999">Up to 89,999 LKR</option>
              <option value="99999">Up to 99,999 LKR</option>
              <option value="199999">Up to 199,999 LKR</option>
              <option value="499999">Up to 499,999 LKR</option>
              <option value="999999">Up to 999,999 LKR</option>
              <option value="999999">Up to 1999,999 LKR</option>
              <option value="999999">Up to 4999,999 LKR</option>
              <option value="999999">Up to 9999,999 LKR</option>
            </select>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
