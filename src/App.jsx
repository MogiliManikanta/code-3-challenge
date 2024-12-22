import React, { useState } from "react";
import currency from "currency.js";

const productList = [
  { id: 1, name: "Product A", price: 50, quantity: 1 },
  { id: 2, name: "Product B", price: 30, quantity: 1 },
  { id: 3, name: "Product C", price: 50, quantity: 1 },
  { id: 4, name: "Product D", price: 30, quantity: 1 },
  { id: 5, name: "Product E", price: 50, quantity: 1 },
  { id: 6, name: "Product F", price: 30, quantity: 1 },
  { id: 7, name: "Product G", price: 50, quantity: 1 },
  { id: 8, name: "Product H", price: 30, quantity: 1 },
];

const App = () => {
  const [products, setProducts] = useState(productList);
  const [discount, setDiscount] = useState(0);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: 1,
  });

  const handleQuantityChange = (id, newQuantity) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
    setProducts(updatedProducts);
  };

  const handleDiscountChange = (e) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value)));
    setDiscount(value);
  };

  const calculateTotal = () =>
    products.reduce(
      (total, product) =>
        total.add(currency(product.price).multiply(product.quantity)),
      currency(0)
    );

  const calculateDiscountedTotal = () => {
    const total = calculateTotal();
    return total.subtract(total.multiply(discount).divide(100));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!newProduct.name || newProduct.price <= 0 || newProduct.quantity <= 0) {
      alert("Please provide valid product details.");
      return;
    }

    const newProductData = {
      ...newProduct,
      id: products.length + 1, // Generate new ID
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
    };

    setProducts([...products, newProductData]);

    setNewProduct({
      name: "",
      price: "",
      quantity: 1,
    });
  };

  return (
    <div className="shopping-cart p-6 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-3xl">
        Shopping Cart
      </h1>

      <table className="table-auto w-full border-collapse border border-gray-300 sm:table-fixed">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Price (USD)</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 px-4 py-2">
                {product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {currency(product.price).format()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  min="0"
                  value={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(product.id, Number(e.target.value))
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {currency(product.price).multiply(product.quantity).format()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <p className="mb-2 text-center sm:text-left">
          Total: {calculateTotal().format()}
        </p>
        <div className="mb-2">
          <label htmlFor="discount" className="mr-2 text-sm">
            Discount (%):
          </label>
          <input
            type="number"
            id="discount"
            min="0"
            max="100"
            value={discount}
            onChange={handleDiscountChange}
            className="w-16 p-1 border rounded"
          />
        </div>
        <p className="text-center sm:text-left">
          Discounted Total: {calculateDiscountedTotal().format()}
        </p>
      </div>

      {/* Add Product Form */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-1">
              Price (USD)
            </label>
            <input
              type="number"
              id="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({ ...newProduct, quantity: e.target.value })
              }
              className="w-16 p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
