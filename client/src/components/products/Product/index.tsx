import {Rating} from 'react-simple-star-rating';
import { Product as ProductType } from "../../../types/product"
import { ProductStyled } from "./ProductStyles";
import { Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../store/store';
import { addToCart } from '../../../store/cartReducer';
import { Link } from 'react-router-dom';

interface IProduct {
    item: ProductType;
}


const Product = ({ item }:IProduct) => {
  const dispatch = useAppDispatch();
  return (
    <>
    <ProductStyled  title={item.title.length>30? item.title.slice(0,30)+'...': item.title}>
    <Link to={`/products/${item._id}`}>
        <img className="image" src={item.image}  alt='product-img' />
        <div>
        <Rating readonly initialValue={item.rating.rate} />
        </div>
        </Link>
        <Button onClick={(e)=>{
          e.stopPropagation();
          e.preventDefault();
          dispatch(addToCart({product: item, onSuccess: (msg: string)=>{
               message.success(msg);
          }}))
        }} icon={<ShoppingCartOutlined />}>Add To Cart</Button>
    </ProductStyled>
    </>
    
    
  )
}

export default Product