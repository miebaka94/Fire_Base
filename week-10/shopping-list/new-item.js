"use client";
import { useState } from "react";


export default function NewItem({ onAddItem }) {
    // State for form fields
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("produce");
  
    // Updated to manage three states: false, 'loading', true
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const newItem = { name, quantity, category };
      onAddItem(newItem);
  
      // Start loading before submission
      setIsSubmitted('loading');
  
      setTimeout(() => {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 2000); // Show check for a bit then reset
      }, 400); // Simulate loading time
  
      setName("");
      setQuantity(1);
      setCategory("produce");
    };
  
  return (
    <div className="flex items-start justify-center mb-8 bg-Gumetal pt-10">
     <form
  onSubmit={handleSubmit}
  className="bg-gray-800 text-white rounded-lg p-4 shadow-xl mb-4 max-h-80 overflow-y-auto"
>


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
            className="block w-full mt-1 px-3 py-2 bg-black border rounded-md shadow-sm focus:outline-none focus:border-blue-300  bg-opacity-80"
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
    className="w-full flex justify-center items-center px-4 py-2 bg-cyan-900 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    {isSubmitted === 'loading' ? (
      // Loading spinner
      <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    ) : isSubmitted ? (
      // Check mark icon
      <svg
        className="w-6 h-6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 13l4 4L19 7"></path>
      </svg>
    ) : (
      // Plus icon
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
        ></path>
      </svg>
    )}
  </button>
</form>
</div>
);
}



   
