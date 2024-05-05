import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillCartCheckFill } from 'react-icons/bs';
import axios from 'axios';

const Navbar = ({ setData, cart, userName }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setAllItems] = useState([]);

    // Fetch all items from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/items/all');
                setAllItems(response.data);
                console.log('Data fetched successfully:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // State variable to hold the selected maximum price
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
                    <Link to={`/home/${userName}`} className="brand">BidZone</Link>

                    <form onSubmit={handleSubmit} className="search-bar">
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="Search Products"
                        />
                    </form>

                    <Link to={`/sell/${userName}`} className="brand">Sell Item</Link>
                    <Link to="/cart" className="cart">
                        <button type="button" className="btn btn-primary position-relative">
                            <BsFillCartCheckFill style={{ fontSize: '1.5rem' }} />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cart.length}
                            </span>
                        </button>
                    </Link>
                </div>

            </header>
        </>
    );
};

export default Navbar;
