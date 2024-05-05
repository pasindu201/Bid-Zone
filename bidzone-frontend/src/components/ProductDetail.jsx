import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from './../components/Navbar';
import Product from "./Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = ({ cart, setCart, setData }) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [items, setAllItems] = useState([]);

    // Fetch all items from the API when the component mounts
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("http://localhost:8080/items/all"); // Assuming the base URL is the same as the API base URL
                const data = await response.json();
                setAllItems(data);

                // Filter products based on the provided `id`
                const filteredProduct = data.find((item) => item.id == id);
                setProduct(filteredProduct);

                // Filter related products based on the category of the current product
                const filteredRelatedProducts = data.filter(
                    (item) => item.category === filteredProduct.category && item.id !== id
                );
                setRelatedProducts(filteredRelatedProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchItems();
    }, [id]);

    // Function to handle adding a product to the cart
    const addToCart = (id, price, title, description, imgSrc) => {
        const obj = {
            id,
            price,
            title,
            description,
            imgSrc,
        };
        setCart([...cart, obj]);
        toast.success("Item added to cart", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    };

    return (
        <>
            <Navbar cart={cart} setData={setData} />
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="container con">
                <div className="img">
                    <img src={product.imgSrc} alt="" />
                </div>
                <div className="text-center">
                    <h1 className="card-title">{product.title}</h1>
                    <p className="card-text">{product.description}</p>
                    <button className="btn btn-primary mx-3">{product.price} ₹</button>
                    <button
                        onClick={() =>
                            addToCart(
                                product.id,
                                product.price,
                                product.title,
                                product.description,
                                product.imgSrc
                            )
                        }
                        className="btn btn-warning"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
            <h1 className="text-center">Related Products</h1>
            <Product cart={cart} setCart={setCart} items={relatedProducts} />
        </>
    );
};

export default ProductDetail;
