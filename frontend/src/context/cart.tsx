import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {

}


export type Test = {
  cart:OrderDetailInput[],
  setCart:Dispatch<SetStateAction<OrderDetailInput[]>>,
  addToCart:(product : ProductProps, qty: number) => void,
  removeFromCart:(cart: OrderDetailInput[], id: number) => void

  
}

export type UseCart = [
    OrderDetailInput[],
    Dispatch<SetStateAction<OrderDetailInput[]>>,
    (product : ProductProps, qty: number) => void,
    (cart: OrderDetailInput[], id: number) => void

    
]

export interface ProductProps {
    id: number
    name : string
    price: number
    image: string,
    imageWidth: number,
    imageHeight: number,
}
export interface OrderDetailInput {
    productId: number
    name : string
    price: number
    qty: number
    image: string,
    imageWidth: number,
    imageHeight: number,
}

export const CartContext = createContext<UseCart | []>([]);
export const CartProvider : React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<OrderDetailInput[]>([]);

  useEffect(() => {
        if(cart.length === 0 ){
          const parsed = JSON.parse(localStorage.getItem("cart") as string) || []
          if(parsed.length > 0){
            setCart(parsed)
          }
        
        }
        if(cart.length > 0){
          localStorage.setItem("cart", JSON.stringify(cart))
        }

   
      
    
    
  }, [cart])

  const addToCart = (product : ProductProps, qty: number) => {
      let copy = cart.slice()
      const item = copy.findIndex(item => item.productId === product.id)
      if(item !== -1){
        let itemCopy = {...copy[item]}
        itemCopy.qty = itemCopy.qty + qty
        console.log(itemCopy)
        copy[item] = itemCopy
        setCart(copy)

      } else {
        setCart([...cart, {productId: product.id, name: product.name, price: product.price, qty: qty,
        image: product.image, imageWidth: product.imageWidth, imageHeight: product.imageHeight }])
      
      }
      
  }
  const removeFromCart = (cart: OrderDetailInput[], id: number) => {
   const idx =  cart.find(item => item.productId === id)
    if(idx){
      
      const filtered = cart.filter(item => item.productId !== id)
      if(filtered.length === 0){
        localStorage.clear()
        setCart([])
      }else{
        setCart(filtered)
      }
   
    }
    return 
  

  }
  return (
    <CartContext.Provider value={[cart, setCart, addToCart, removeFromCart]}>
      {children}
    </CartContext.Provider>
  );
};
export default {CartContext, CartProvider};

