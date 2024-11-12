import { useContext, useEffect } from "react"
import { myContext } from "../../context/myContext"

// Add to cart Component
//Props:- 
//decreamentFunc: decreament function to excute when user click on (-)
//increamentFunc: increament function to excute when user click on (+)
//resetFunc: when user deletes the item from cart
//state: state of reducer function to change on every update on it
const AddToCart = ({ decreamentFunc, increamentFunc, resetFunc, state }) => {
  // Component Logic . . .
  const cartImg = require("../../assets/images/icon-add-to-cart.svg").default
  const { setCartItems, deletedItem} = useContext(myContext)
  const addToCart = () => {
    increamentFunc();
    setCartItems((prevCart) => {
      const exicitingItem = prevCart.find(cartItem => cartItem.dessert.name === state.dessert.name)
      if (exicitingItem) {
        return prevCart.map((cartItem) => cartItem.dessert.name === state.dessert.name
          ? { ...cartItem, quantity: state.quantity + 1 }
          : cartItem)
      } else {
        // If it doesn't exist, add the item
        return [...prevCart, state];
      }
    })
  }
  const updateItemsQuantity = () => {
    decreamentFunc()
    setCartItems((prevCart) => {
      const exicitingItem = prevCart.find(cartItem => cartItem.dessert.name === state.dessert.name)
      if (exicitingItem) {
        const updatingCart = prevCart.map((cartItem) => cartItem.dessert.name === state.dessert.name ?
          { ...cartItem, quantity: state.quantity - 1 } : cartItem)
        return updatingCart.filter(cartItem => cartItem.quantity > 0)
      } else {
        return [...prevCart, state]
      }
    })
  }
  useEffect(() => {
    if (deletedItem === state.dessert.name) {
      resetFunc()
    }
  }, [deletedItem])
  return (
    <>
      <div className="add-to-cart">
        <div className="add-to-cart_btns">
          <button className="add-to-cart_btn" onClick={() => addToCart()}>
            <img src={cartImg} alt="cart icon" />
            <span>Add to Cart</span>
          </button>
          <div className={`add-to-cart_count ${state.purchased ? "isPurchased" : ""}`}>
            <button aria-label="decreament" className="decreament" onClick={() => updateItemsQuantity()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2" aria-hidden><path fill="#fff" d="M0 .375h10v1.25H0V.375Z" /></svg>
            </button>
            <span>{state.quantity}</span>
            <button aria-label="increament" className="increament" onClick={() => addToCart()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10" aria-hidden><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default AddToCart;