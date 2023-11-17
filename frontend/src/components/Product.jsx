import React from 'react'
import {Link} from "react-router-dom"
import ReactStars from "react-rating-stars-component"




const Product = ({product}) => {
  
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth <600 ? 13 : 20,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Link id='productCard' className='w-[14vmax] hover:shadow-md hover:-translate-y-[1vmax] rounded-md flex flex-col m-[2vmax] text-[#303030] pb-[0.5vmax] transition-all duration-500' to={product._id} >
      <img className='w-[14vmax] overflow-hidden rounded-t-md ' src={product.images[0].url} alt={product.name} />
      <p className='text-lg px-3 pt-2'>{product.name}</p>
      <div className='md:m-[0.5vmax] md:flex justify-start items-center'>
        <ReactStars {...options} /> <span className='text-sm'>{product.numOfReviews}</span>
      </div>
      <span className='m-[0.5vmax] text-[#FF6347] text-lg'>{`₹${product.price}`}</span>
    </Link>
  )
}

export default Product