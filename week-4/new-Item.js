"use client"
import React, { useState } from "react";

export default function NewItem() {
  // State for form fields
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  // State to manage the icon change on submission
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle the form submission logic here
    const item = { name, quantity, category };
    console.log(item);
    alert(`Name: ${name}, Quantity: ${quantity}, Category: ${category}`);

    // Change the icon to a check mark
    setIsSubmitted(true);

    // Reset the icon back to a plus sign after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);

    // Optionally, reset the form fields to their initial values here
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <div className="flex items-start justify-center h-screen bg-gray-800 pt-10">
      <form onSubmit={handleSubmit} className="bg-Gunmetal text-white rounded-lg p-4 shadow-xl">
        <div className="mb-2">
          <input
            id="itemName"
            type="text"
            placeholder="Item name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-black border rounded-md shadow-sm focus:outline-none focus:border-blue-300"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="quantity" className="block text-sm font-medium">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            required 
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-black border rounded-md shadow-sm focus:outline-none focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full mt-1 px-3 py-2 bg-black border rounded-md shadow-sm focus:outline-none focus:border-blue-300"
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen-foods">Frozen Foods</option>
            <option value="canned-goods">Canned Goods</option>
            <option value="dry-goods">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitted ? (
            // Check mark icon
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            // Plus icon
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
