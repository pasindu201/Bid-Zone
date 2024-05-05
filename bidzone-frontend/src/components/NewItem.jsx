import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from './../components/Navbar'

function NewItem({cart,setCart,setData }) {
    const { userName } = useParams();
    const [itemData, setItemData] = useState({
        category: '',
        title: '',
        description: '',
        imgSrc: null,
        seller: '',
        minimum_price: '',
        start_action: '',
        end_auction: ''
    });

    const [imagePreview, setImagePreview] = useState(null);

    // Handler for input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'imgSrc') {
            // Handle file input change
            const file = files[0];
            setItemData((prevData) => ({
                ...prevData,
                imgSrc: file
            }));

            // Create a preview URL for the selected image
            if (file) {
                const previewURL = URL.createObjectURL(file);
                setImagePreview(previewURL);
            } else {
                setImagePreview(null);
            }
        } else {
            // Handle other input changes
            setItemData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(itemData);

        // Create a FormData object to hold the form data
        const formData = new FormData();
        formData.append('category', itemData.category);
        formData.append('title', itemData.title);
        formData.append('description', itemData.description);
        formData.append('imgSrc', itemData.imgSrc);
        formData.append('seller', userName);
        formData.append('minimum_price', itemData.minimum_price);
        formData.append('start_auction', itemData.start_action);
        formData.append('end_auction', itemData.end_auction);
        formData.append('max_bid', itemData.minimum_price);

        try {
            // Send the form data to the server using a POST request
            const response = await axios.post('http://localhost:8080/items/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Handle the server's response
            console.log(response.data);
            alert('Item saved successfully');
        } catch (error) {
            console.error('Failed to save item:', error);
            alert('Failed to save item');
        }
    };

    return (    
        <> 
        <Navbar cart={cart} setData={setData} userName={userName}/>
        <div className="container my-5" style={{ width: '54%' }}>
            
            <h2 className="text-center">Add New Item</h2>
            {/* Image preview */}
            {imagePreview && (
                <div className="text-center mb-3">
                    <img src={imagePreview} alt="Preview" className="img-fluid rounded" style={{ maxHeight: '300px' }} />
                </div>
            )}
            <form onSubmit={handleSubmit}>
               {/* Category input */}
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        className="form-control"
                        id="category"
                        name="category"
                        value={itemData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="sports">Sports</option>
                        <option value="books">Books</option>
                        <option value="vehicles">Vehicles</option>
                        <option value="home">Home</option>
                        <option value="lands">Lands</option>
                    </select>
                </div>

                {/* Title input */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        value={itemData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Description input */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        placeholder="Enter description"
                        value={itemData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Image input */}
                <div className="mb-3">
                    <label htmlFor="imgSrc" className="form-label">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="imgSrc"
                        name="imgSrc"
                        accept="image/*"
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Minimum price input */}
                <div className="mb-3">
                    <label htmlFor="minimum_price" className="form-label">Minimum Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="minimum_price"
                        name="minimum_price"
                        placeholder="Enter minimum price"
                        value={itemData.minimum_price}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Start auction input */}
                <div className="mb-3">
                    <label htmlFor="start_action" className="form-label">Start Auction</label>
                    <input
                        type="date"
                        className="form-control"
                        id="start_action"
                        name="start_action"
                        value={itemData.start_action}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]} 
                    />
                </div>

                {/* End auction input */}
                <div className="mb-3">
                    <label htmlFor="end_auction" className="form-label">End Auction</label>
                    <input
                        type="date"
                        className="form-control"
                        id="end_auction"
                        name="end_auction"
                        value={itemData.end_auction}
                        onChange={handleChange}
                        required
                        min={itemData.start_action}  
                    />
                </div>


                {/* Submit button */}
                <button type="submit" className="btn btn-primary">Sell Item</button>
            </form>
        </div>
        </>  
    );
}

export default NewItem;
