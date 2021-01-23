import React, { useState, useEffect } from "react";
import { shoppy } from "./lib/shoppy";

import { Products, Navbar, Cart } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await shoppy.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await shoppy.cart.retrieve());
  };

  const handleAddToCart = async (productId, quanitity) => {
    const item = await shoppy.cart.add(productId, quanitity);

    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
