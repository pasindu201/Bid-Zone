import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './../components/Navbar'

const Cart = ({cart,setCart,setData }) => {
  return (
    <>
    <Navbar cart={cart} setData={setData} userName={userName}/>
    <div className="container my-5" style={{width:"54%"}}>
      {
        cart.length==0 ?(
<>
<div className='text-center'>
  <h1>Your Cart is Empty</h1>
  <Link to={"/"} className='btn btn-warning'>Continue Shopping...</Link>
</div>
</>
        ):
      cart.map((product)=>{
        return(
          <>
          <div className="card mb-3 my-5" style={{width:'700px'}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={product.imgSrc} className="img-fluid rounded-start" alt="..." />
    </div>
    <div className="col-md-8">
      <div className="card-body text-center">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <hr/>
                      <p className="card-text">Starting : {product.start_auction}</p>
                      <p className="card-text">End :{product.end_auction}</p>
        <button className="btn btn-primary mx-3">
                        {product.price} LKR
                      </button>
                      <button
                 
                       className="btn btn-warning"
                       >Buy Now</button>
      </div>
    </div>
  </div>
</div>
          </>
        )
      })}

      
    </div>

    {
        cart.length!=0 && (
          <div className="container text-center my-5" style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
  
          }}>
            <button className='btn btn-warning mx-5 '>CheckOut</button>
            <button onClick={()=>setCart("")} className='btn btn-danger'>Clear Cart</button>
          </div>
        )
      }
    
       
    </>
  )
}

export default Cart