import { decrementItem, incrementItem } from "../../../store/cartReducer";
import { useAppDispatch } from "../../../store/store";
import { Product } from "../../../types/product"
import { CartItemStyled } from "./CartItemStyled"

interface ICartItemProps {
    item: Product & {quantity: number};
}   

const CartItem = ( {item }: ICartItemProps) => {
  const dispatch = useAppDispatch();
  return (
    <CartItemStyled>
        <div>
          <h5>{item.title.length>15?item.title.slice(15)+'....':item.title}</h5>
          <img src={item.image} alt="" />
          <h5>${item.price}</h5>
        </div> 
        <div className="actions">
          <div onClick={()=>dispatch(incrementItem({product: item}))} className="action">+</div>
          <div className="quantity">{item.quantity}</div>
          <div onClick={()=>dispatch(decrementItem({product: item}))} className="action">-</div>
        </div>
    </CartItemStyled>
  )
}

export default CartItem;