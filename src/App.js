import React, { useState, useEffect } from "react";
import { shoppy } from "./lib/shoppy";

import { Products, Navbar } from "./components";

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
    <div>
      <Navbar totalItems={cart.total_items} />
      <Products products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default App;
