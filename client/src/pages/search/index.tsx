import { useEffect } from 'react';
import Product from '../../components/products/Product';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { SearchContainer } from './SearchStyles'
import { Divider, Spin, Typography } from 'antd'
import { searchProduct } from '../../store/productReducer';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

const Search = () => {
  const dispatch = useAppDispatch();
  const {searchLoading, searchedProducts} = useAppSelector(state=>state.products);
  const {state}=useLocation();
  useEffect(()=>{
    dispatch(searchProduct(state?.searchedValue))
  },[dispatch, state?.searchedValue])
  if(searchLoading && !searchedProducts.length) {
    return (
     <div className='center'>
       <Spin size='large'/>
     </div>
    )
  }
  return (
    <SearchContainer>
      <Title>Found {searchedProducts?.length} Results</Title>
      <Divider/>
      {searchedProducts.length? (
        <div className='products'>
          { searchedProducts.map(product=>(
        <Product key={product._id} item={product} />
      ))}
        </div>
      ) : (
        <div className='center'>
          <Title>No Product Found</Title>
        </div>
      )}
    </SearchContainer>
  )
}

export default Search