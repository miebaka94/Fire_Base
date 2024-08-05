// Page.js

"use client"; // Indicate client-side execution in Next.js
import React, { useState, useEffect } from "react";
import FetchMealIdeas from "./meal-ideas"; // Make sure the path matches your file structure
import ItemList from "../../week-7/item-list"; // Make sure the path matches your file structure
import NewItem from "./new-item"; // Make sure the path matches your file structure
import { useUserAuth } from "../_utils/auth-context";
import Link from 'next/link';
import { getItems, addItem } from "../_services/shopping-list-service";




export default function Page() {
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(""); // New state variable for the selected item
  const [showMealIdeas, setShowMealIdeas] = useState(false); // State variable to control rendering of meal ideas
  const { user } = useUserAuth();

  const handleAddItem = async (newItem) => {
    const existingItemIndex = items.findIndex(
      (item) => item.name === newItem.name && item.category === newItem.category
    );
  
    if (existingItemIndex !== -1) {
      // Update quantity of the existing item
      const updatedItems = items.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + newItem.quantity };
        }
        return item;
      });
      setItems(updatedItems);
    } else {
      // Add new item to the database and then update local state
      try {
        const itemId = await addItem(user.uid, newItem); // addItem should be an async function
        setItems((currentItems) => [...currentItems, { ...newItem, id: itemId }]);
      } catch (error) {
        console.error("Failed to add item:", error);
      }
    }
  };
  

  async function loadItems() {
    const items = await getItems(user.uid);
    setItems(items);
}


useEffect(() => {
  if (user?.uid) {
    loadItems();
  }
}, [user?.uid]); // This will not throw an error if `user` is null


  // Event handler for selecting an item
  const handleItemSelect = (itemName) => {
    let cleanedName;
    if (typeof itemName === "string") {
      console.log("Item name before cleaning:", itemName); // Log the item name before cleaning

      // Clean the item name
      cleanedName = itemName
        .trim()
        .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");
    } else if (typeof itemName === "object") {
      console.log("Item name before cleaning:", itemName.name); // Log the item name before cleaning

      // Clean the item name
      cleanedName = itemName.name
        .trim()
        .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");
    }
    setSelectedItemName(cleanedName);
    setShowMealIdeas(true); // Set state to show meal ideas
  };

  return (
    <main className="bg-Gumetal p-4">
      {user?
      <>
      <h1 className="text-xl uppercase text-center border font-serif text-cyan-700 mb-4">
        Shopping List
      </h1>
      <NewItem onAddItem={handleAddItem} />

      {/* Flex container for both the item list and meal ideas */}
      <div className="flex mt-4">

        {/* Item List without extra margin */}
        <div className="w-1/4">
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        {/* Meal Ideas, displayed only if showMealIdeas is true */}
        {showMealIdeas && (
          <div className="w-1/5">
            <FetchMealIdeas ingredient={selectedItemName} />
          </div>
        )}
      </div>
      </>:
        <>      
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center p-4 bg-white shadow-xl rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Please log in first.</h1>
            <Link href="/week-8" className="text-lg text-blue-500 hover:text-blue-700">Go to Login
           
            </Link>
          </div>
        </div>
        </>
      }

    </main>
  );
}


