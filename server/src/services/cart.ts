import Cart from "../models/Cart";


export async function createCart(userId: string) {
    await Cart.create({userId, cartItems: []})
}

export async function createOrUpdateCart(userId: string, cartItems: any[]) {
    await Cart.create({userId},{cartItems},{upsert: true});
}

export async function getCart(userId: string) {
    return Cart.findOne({userId});
}

export async function addToCart(userId: string, product: any) {
   const cart = await Cart.findOne({userId});
   if(cart) {
    if(cart?.cartItems.find(item=>item._id===product._id.toString())) {
        cart.cartItems=cart.cartItems.map(item=>({...item, quantity: item.quantity+1}));
      }else{
        cart.cartItems = [...cart?.cartItems || [], {...product, quantity: 1}]
      }
   }
   await cart?.save();
}

export async function incrementItem(userId: string, product: any) {
    const cart = await Cart.findOne({userId});
    if(cart) {
        cart.cartItems = cart.cartItems.map(item=>item._id === product._id.toString()? {...item, quantity: item.quantity+1}: item); 
    }

    await cart?.save();
}

export async function decrementItem(userId: string, product: any) {
    const cart = await Cart.findOne({userId});
    if(cart) {
        const cartItem = cart.cartItems.find(item=>item._id === product._id.toString());
        if(cartItem?.quantity===1) {
            cart.cartItems = cart.cartItems.filter(item=>item._id!==product._id.toString());
        }else{
            cart.cartItems = cart.cartItems.map(item=>item._id===product._id.toString()? {...item, quantity: item.quantity-1}: item);
        }
    }

    await cart?.save();
}