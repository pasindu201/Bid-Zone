import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignInpage() {
    const [itemData, setItemData] = useState({
        imageFile: null,
        title: '',
        description: '',
        price: ''
    });

    const [imagePreview, setImagePreview] = useState(null);

    // Handler for input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            // Handle file input change
            const file = files[0];
            setItemData((prevData) => ({
                ...prevData,
                imageFile: file
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
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Process form data including the image file
        console.log('Form submitted:', itemData);

        // You can send `itemData` to a server here for further processing.
    };

    return (
        <div className="container my-5" style={{ width: "54%" }}>
            <h2 className="text-center">Create New Account</h2>
            
            {/* Image preview */}
            {imagePreview && (
                <div className="text-center mb-3">
                    <img src={imagePreview} alt="Preview" className="img-fluid rounded" style={{ maxHeight: '300px' }} />
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                {/* Image input */}
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        required
                    />
                </div>
                
                {/* Title input */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="Enter your name"
                        value={itemData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                {/* Description input */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Enter Your Home Address</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        placeholder="Enter home address"
                        value={itemData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                {/* Price input */}
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">E-mail Address</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        placeholder="Enter e-mail"
                        value={itemData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Price input */}
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Password</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        placeholder="Enter password"
                        value={itemData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                {/* Submit button */}
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>

            {/* Link to navigate back */}
            <div className="mt-3">
                <Link to="/" className="btn btn-secondary">Back to Home</Link>
            </div>
        </div>
    );
}

export default SignInpage;
