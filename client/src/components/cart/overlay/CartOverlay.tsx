import { Button, Divider } from "antd";
import { useAppSelector } from "../../../store/store"
import CartItem from "../cart-item/CartItem";
import { OverlayContainer } from "./OverlayStyles"
import { useNavigate } from "react-router-dom";

const CartOverlay = () => {
  const navigate = useNavigate();
    const { cartItems } = useAppSelector(state=>state.cart);
    const totalPrice = cartItems.reduce((a,v)=>a+(v.quantity*v.price),0);
    const cartItemsCount = cartItems.reduce((a,v)=>a+(v.quantity),0)
  return (
       <OverlayContainer>
        <p>My Bag, <strong>{cartItemsCount} items</strong></p>   
        <Divider/>
        {cartItems.map(item=>(
            <CartItem key={item._id} item={item} />
        ))}
        <Divider/>
            <h5 className="total">Total: ${totalPrice.toFixed(2)}</h5>
            <Button onClick={()=>navigate('/payment', {state: { total : totalPrice.toFixed(2)}})} style={{width:'100%', marginTop: '15px'}}>Checkout</Button>
    </OverlayContainer>
   
  )
}

export default CartOverlay