import { Product as ProductType, ProductSliderType } from '../../types/product';
import { useAppDispatch } from '../../store/store';
import { useEffect } from 'react';
import { getHotsaleProducts, getPopularProducts, getRecentProducts } from '../../store/productReducer';
import { Spin } from 'antd';
import { ProductListContainer } from './ProductsStyles';
import Product from './Product';
import { productSettings } from '../../utils/constants';

interface IProductSliderProps {
    type: ProductSliderType;
    data: ProductType[] | null
}

const ProductsSlider = ({ type, data }: IProductSliderProps) => {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(type==='recent') {
            dispatch(getRecentProducts());
        }else if(type==='hotsales') {
            dispatch(getHotsaleProducts());
        }else if(type==='popular') {
            dispatch(getPopularProducts())
        }
    },[dispatch, type])
  return (
    data? <ProductListContainer {...productSettings}>
        {data.map(item=>(
        <Product item={item} />
    ))}
    </ProductListContainer> : (
        <div className='center'>
            <Spin size='large' />
        </div>
    )
  )
}




export default ProductsSlider