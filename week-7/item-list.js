import React from "react";
import Item from "./item";
import { useState } from "react";
export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  // Function to group items by category ensuring immutability
  const groupByCategory = (items) => {
    return items.reduce((groups, item) => {
      const { category } = item;
      if (!groups[category]) {
        groups[category] = []; // Initialize if not already done
      }
      groups[category] = [...groups[category], item]; // Use spread operator to add item
      return groups;
    }, {});
  };

  const sortItems = (items, sortBy) => {
    switch (sortBy) {
      case "name":
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      case "category":
        return [...items].sort((a, b) => a.category.localeCompare(b.category));
      default:
        return items; // For 'groupedCategory', sorting is handled separately
    }
  };

  const sortedOrGroupedItems =
    sortBy === "groupedCategory"
      ? groupByCategory(sortItems([...items], "name")) // Ensure immutability by spreading items
      : sortItems([...items], sortBy); // Spread items to avoid mutation

  const renderItems = () => {
    if (sortBy === "groupedCategory") {
      return Object.entries(sortedOrGroupedItems).map(([category, items]) => (
        <div key={category} className="category-group mb-4">
          <h3 className="capitalize font-bold text-white bg-gray-800 p-2 rounded">
            {category}
          </h3>
          <ul className="flex flex-wrap justify-start gap-2">
            {items.map((item) => (
              <Item key={item.id} {...item} />
            ))}
          </ul>
        </div>
      ));
    } else {
      return (
        <ul className="list-none ml-1 mt-0 inline-block">
          {" "}
          {/* Adjusted top margin here */}
          {sortedOrGroupedItems.map((item) => (
            <Item key={item.id} {...item} className="border p-2" />
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="item-list i">
      <div className="mb-4 bg-Gumetal">
        <button
          className={`ml-1 mr-2 p-2 ${
            sortBy === "name" ? "bg-cyan-900 text-white" : "bg-gray-200"
          } rounded-md`}
          onClick={() => setSortBy("name")}
        >
          Name
        </button>
        <button
          className={`mr-2 p-2 ml-1 mt-1 rounded-md ${
            sortBy === "category" ? "bg-cyan-900 text-white" : "bg-gray-200"
          } `}
          onClick={() => setSortBy("category")}
        >
          Category
        </button>
      </div>
      {renderItems()}
    </div>
  );
}
