import { useContext, useState } from "react";
import { myContext } from "../../context/myContext";
import ConfirmOrder from "./ConfirmOrder";

// Cart Component
const Cart = () => {
  // Cart Logic . . .
  const { cartItems, setCartItems,setDeletedItem } = useContext(myContext)
  const emptyCart = require("../../assets/images/illustration-empty-cart.svg").default
  const removeItemIcon = require("../../assets/images/icon-remove-item.svg").default
  const carbonIcon = require("../../assets/images/icon-carbon-neutral.svg").default
  const [isConfirmed, setISConfirmed] = useState(false)

  const removeItem = (itemIdex) => {
    let newCart = cartItems.filter((cartItem, index) => index !== itemIdex)
    return setCartItems(newCart)
  }
  const itemsCount = () => {
    const counts = cartItems.reduce((sum, curr) => sum + curr.quantity, 0)
    return counts;
  }
  const calcItemPrice = (item) => {
    const res = item.dessert.price * item.quantity
    return "$"+res.toFixed(2)
  }
  const itemsTotalPrice = () => {
    const res = cartItems.reduce((sum, curr) => sum + (curr.dessert.price * curr.quantity), 0)
    return "$"+res.toFixed(2)
  }
  return (
    <>
      <section>
        <h2>Your Cart ({itemsCount()})</h2>
        {!cartItems.length ?
          <>
            <img src={emptyCart} alt="empty cart illustration" />
            <p className="empty-cart-message">You added items will appear here</p>
          </>
          :
          <>
          <ul className="list-items">
            {cartItems.map((item, index) => {
              return <li key={index}>
                <span className="cart-item_name">{item.dessert.name}</span>
                <div className="price-quantity-wrapper">
                  <span className="cart-item_quantity">{item.quantity}x</span>
                  <span className="cart-item_price">
                    <span className="cart-item_price-per-one">@${item.dessert.price.toFixed(2)}</span>
                    <span className="cart-item_price-per-quantity">{calcItemPrice(item)}</span>
                  </span>
                </div>
                <button className="cart-item_remover" onClick={() => { removeItem(index); setDeletedItem(item.dessert.name) }}>
                  <img src={removeItemIcon} alt="" />
                </button>
              </li>
            })}
          </ul>
          <p className="total-amount">
          <span>Order Total</span>
          <span>
            {itemsTotalPrice()}
          </span>
        </p>
        <p className="carbon-message">
            <img src={carbonIcon} alt="" /> This is a <strong>carbon-neutral</strong> delivery 
        </p>
        <button className="confirm-order" onClick={() => setISConfirmed(true)}>Confirm Order</button>
            </>
        }
      </section>
      {isConfirmed && <ConfirmOrder confirmedItems = {cartItems}/>} 
    </>
  )
}
export default Cart;