import { useState } from "react";
import Dessert from "./component/dessertMenu/Dessert";
import Cart from "./component/cart/Cart";
import { myContext } from "./context/myContext";

//App component
function App() {
  const [cartItems, setCartItems] = useState([])
  const [deletedItem, setDeletedItem] = useState("")

//Component Logic ...
  return (
    <main className="App">
      <myContext.Provider value={{cartItems, setCartItems,deletedItem, setDeletedItem}}>
      <section className="desserts">
        <h1>Desserts</h1>
        <Dessert />
      </section>
      <aside className="cart">
        <Cart />
      </aside>
      </myContext.Provider> 
    </main>
  );
}

export default App;
