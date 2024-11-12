import { useReducer } from "react";
import AddToCart from "./AddToCart";

// Reducer Function to updata dessert items quantity and check if is purchased or not
const reducer = (state, action) => {
  switch (action.type) {
    case "increament":
      return {
        ...state,
        quantity: state.quantity += 1,
        purchased: state.purchased = true,
      }
    case "decreament":
      return {
        ...state,
        quantity: state.quantity -= 1,
        purchased: state.quantity < 1 ? state.purchased = false : state.purchased = true
      }
    case "reset":
      return {
        ...state,
        quantity: state.quantity = 0,
        purchased: state.purchased = false,
      }
    default:
      break;
  }
}

// Desseert Component
//Props :-
//dessert: dessert data that comes from json file
const DessertItem = ({ dessert }) => {
// Component Logic
  const dessertItem = {
    dessert: dessert,
    quantity: 0,
    purchased: false
  }
  const { desktop, tablet, mobile } = dessertItem.dessert.image;

  const [state, dispatch] = useReducer(reducer, dessertItem)
  const decreamentFunc = () => {
    dispatch({ type: 'decreament' })
  }
  const increamentFunc = () => {
    dispatch({ type: 'increament' })
  }
  const resetFunc = () => {
    dispatch({ type: 'reset' })
  }
  return (
    <>
      <div className="dessert-item">
        <figure>
          <picture className={`dessert-item_img ${state.purchased ? "in-cart" : ""}`}>
            <source media="(min-width: 1024px)" srcSet={desktop} />
            <source media="(min-width: 768px)" srcSet={tablet} />
            <source media="(min-width: 320px)" srcSet={mobile} />
            <img src={process.env.PUBLIC_URL + mobile} alt={`A beautifully arranged ${dessert.name} served on a plate`} loading="lazy" />
          </picture>
          <p className="dessert-item_category">{dessertItem.dessert.category}</p>
          <figcaption className="dessert-item_name">{dessertItem.dessert.name}</figcaption>
          <p className="dessert-item_price">${dessertItem.dessert.price.toFixed(2)}</p>
        </figure>
        <AddToCart decreamentFunc={decreamentFunc} increamentFunc={increamentFunc} state={state} resetFunc={resetFunc} />
      </div>
    </>
  )
}
export default DessertItem;