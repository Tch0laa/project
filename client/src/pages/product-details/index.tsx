import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import { Rating } from 'react-simple-star-rating';

import { useAppDispatch, useAppSelector } from "../../store/store"
import { getSingleProduct } from "../../store/productReducer";
import { DetailsContainer } from "./DetailStyles";
import { addToCart } from "../../store/cartReducer";



const ProductDetails = () => {
  const { currentProduct,productLoading }=useAppSelector(state=>state.products);
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(getSingleProduct(productId as string))
  },[dispatch, productId]);

  if(productLoading || !currentProduct) {
    return (
      <div className="center">
        <Spin size='large' />
      </div>
    )
  }
  return (
   <DetailsContainer>
       <img src={currentProduct.image} alt="" />
       <div className="product-info">
        <h1>{currentProduct.title}</h1>
        <p>Price: <strong>${currentProduct.price}</strong></p>
        <p>Available : <strong>{currentProduct.isInStock? 'Yes':'No'}</strong></p>
        <p><strong>Category: </strong>{currentProduct.category}</p>
        <p className="desc"> <strong>Description: </strong> {currentProduct.description}</p>
        <Rating readonly initialValue={currentProduct.rating.rate}/>
        <p><strong>{currentProduct.rating.count}</strong> People reviewed it</p>
        <Button onClick={()=>dispatch(addToCart(currentProduct))} type='primary'>Add To Cart</Button>
       </div>
   </DetailsContainer>
  )
}

export default ProductDetails