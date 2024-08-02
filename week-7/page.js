
// Add the "use client" directive to indicate client-side execution in Next.js
"use client";

import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json"; // Ensure this path matches your actual JSON file location

export default function Page() {
  const [items, setItems] = useState(itemsData); // Initialize state with items from JSON

  // Event handler that adds a new item to the list
  const handleAddItem = (newItem) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => 
        item.name === newItem.name && item.category === newItem.category);
  
      if (existingItemIndex !== -1) {
        // Update quantity of the existing item
        return currentItems.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + newItem.quantity };
          }
          return item;
        });
      } else {
        // Add new item
        return [...currentItems, newItem];
      }
    });
  };

  return (
    <main className="bg-Gumetal">
      <h1 className="text-xl uppercase text-center border font-serif text-cyan-700">Shopping List</h1>
     
      <NewItem onAddItem={handleAddItem} />
      {/* Pass the items state to ItemList as a prop */}
      <ItemList items={items} />
    </main>
  ); 
}
