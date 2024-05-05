import React from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './../components/Navbar'

const Product = ({items, cart , setCart, setData}) => {
  const { userName } = useParams();

   
  const addToCart = (id,price,title,description,imgSrc) =>{

    const handleBid = async () => {
      
    };
  
    const obj = {
      id,price,title,description,imgSrc
    }
    setCart([...cart, obj]);
    console.log("Cart element = ",cart)
    toast.success('Item added on cart', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  return (
    <>
    <Navbar cart={cart} setData={setData} userName={userName}/>
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
      <div className="container my-5">
        <div className="row">
          {items.map((product) => {
            return (
              <>
                <div key={product.id} className="col-lg-4 col-md-6 my-3 text-center">
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={`data:image/jpeg;base64,${product.imgSrc}`}
                      className="card-img-top"
                      alt="..."
                      />                     
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      <hr/>
                      <p className="card-text">Starting : {product.start_action}</p>
                      <p className="card-text">End :{product.end_auction}</p>
                      <p className="card-text">Minimun Price :{product.minimum_price}</p>
                      <button className="btn btn-primary mx-3 mb-3">
                        Max Bid :{product.minimum_price} LKR
                      </button>
                      <input className="mb-3" id="myPrice" type="text" placeholder="Your bid" required/>                     
                      <button
                      onClick={()=>addToCart(product.id,product.price,product.title,product.description,product.imgSrc)}
                       className="btn btn-warning"
                       >Submit</button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;
