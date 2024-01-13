import { Button, Dropdown, Input, MenuProps } from 'antd';
import {  LoginOutlined, SearchOutlined } from '@ant-design/icons';

import { NavbarContainer } from './NavbarStyles';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useState } from 'react';
import CartOverlay from '../cart/overlay/CartOverlay';
import { logout } from '../../store/authReducer';

const { Search } = Input;

const items: (navigate: any, dispatch:any)=>MenuProps['items'] =(navigate: any, dispatch)=> [
  {
    key:'1',
    label:'Profile',
    onClick: ()=>{
       navigate('/profile') 
    }
  },
  {
    key:'3',
    label:'Log Out',
    onClick: ()=>{
      dispatch(logout())
    }
  },
]

const Navbar = () => {
  const { authedUser } = useAppSelector(state=>state.auth);
  const { cartItems } = useAppSelector(state=>state.cart);
  const quantity = cartItems.reduce((a,v)=>a+(v.quantity),0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isOverlayOpen, setIsOverlayOpen]=useState(false);
  const [searchedValue, setSearchedValue]=useState('');
  return (
    <NavbarContainer>
      <Link className='logo' to="/">
      <h1 >E-Shop</h1></Link>
        <Search enterButton={(<Button disabled={!searchedValue}><SearchOutlined/></Button>)}value={searchedValue} onChange={e=>setSearchedValue(e.target.value)} onSearch={()=>navigate('/search',{state:{searchedValue}})} size='large' placeholder='Search...' />
        <div className="right">
          <div onClick={()=>setIsOverlayOpen(prev=>!prev)} className='cart-wrap'>
          <img className='cart' src="/img/cart.jpeg" alt="" />
        {quantity && quantity!==0 ? <div className='cart-count'>{quantity}</div>: '' } 
          </div>
         
          {authedUser ? (
            <Dropdown  menu={{items: items(navigate, dispatch) }}>
             <img className='avatar-img' src="/img/avatar.jpg" alt="" />
            </Dropdown>
          ):  <Link to='/signin'>
          <Button type='primary' icon={<LoginOutlined />}>Sign In</Button>
          </Link> }
         
        </div>
        {isOverlayOpen && <CartOverlay/>}
    </NavbarContainer>
  )
}

export default Navbar;