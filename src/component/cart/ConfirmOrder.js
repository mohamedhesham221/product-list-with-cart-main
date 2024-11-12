// Confirm modal Component
//Props: 
// confirmedItems: selected items from cart component
const ConfirmOrder = ({ confirmedItems }) => {
  // Component Logic . . .
  const confirmIcon = require("../../assets/images/icon-order-confirmed.svg").default

  const itemsTotalPrice = () => {
    const res = confirmedItems.reduce((sum, curr) => sum + (curr.dessert.price * curr.quantity), 0)
    return "$" + res.toFixed(2)
  }

  return (
    <>
      <div className="order-confirmed-component">
        <section>
          <img src={confirmIcon} alt="" />
          <h2>Order Confirmed</h2>
          <p>We hope you enjoy your food!</p>
          <ul>
            {
              confirmedItems?.map((item, index) => {
                return <li className="dessert-confirmed-item" key={index}>
                  <img src={item.dessert.image.thumbnail} alt="" className="thmubnail" />
                  <span className="dessert-detail">
                    <span className="dessert-name">{item.dessert.name}</span>
                    <span className="dessert-quantity-price">
                      <span className="dessert-quantity-price_quantity">{item.quantity}x</span>
                      <span className="dessert-quantity-price_price">@${item.dessert.price.toFixed(2)}</span>
                    </span>
                  </span>
                  <span className="total-price">${(item.quantity * item.dessert.price).toFixed(2)}</span>
                </li>
              })
            }
            <li><p className="total-amount">
              <span>Order Total</span>
              <span>
                {itemsTotalPrice()}
              </span>
            </p></li>
          </ul>
          <button onClick={() => window.location.reload()}>Start New Order</button>
        </section>
      </div>
    </>
  )
}
export default ConfirmOrder