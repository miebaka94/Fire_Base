"use client"
import React, { useState } from 'react';
import Item from "./item";
import itemsData from './items.json';

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");
  const [items, setItems] = useState(itemsData);

  // Function to group items by category
  const groupByCategory = (items) => {
    return items.reduce((groups, item) => {
      const { category } = item;
      groups[category] = groups[category] || [];
      groups[category].push(item);
      return groups;
    }, {});
  };

  // Function to sort items by the current method
  const sortItems = (items, sortBy) => {
    switch (sortBy) {
      case 'name':
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      case 'category':
        return [...items].sort((a, b) => a.category.localeCompare(b.category));
      default:
        return items; // In case of groupedCategory, we handle sorting separately
    }
  };

  // Determine how to sort or group items based on `sortBy`
  const sortedOrGroupedItems = sortBy === 'groupedCategory'
    ? groupByCategory(sortItems(items, 'name')) // Group by category after sorting by name
    : sortItems(items, sortBy);

  // Render items or grouped items based on `sortBy`
  const renderItems = () => {
    if (sortBy === 'groupedCategory') {
      return Object.entries(sortedOrGroupedItems).map(([category, items]) => (
        <li key={category} className="border p-2">
          <h3 className="capitalize font-bold">{category}</h3>
          {items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </li>
      ));
    } else {
      return sortedOrGroupedItems.map((item) => (
        <Item key={item.id} {...item} className="border p-2" />
      ));
    }
  };

  return (
    <div className="item-list">
      <div className="mb-4">
        <button
          className={`mr-2 p-2 ${sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSortBy('name')}
        >
          Sort by Name
        </button>
        <button
          className={`mr-2 p-2 ${sortBy === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSortBy('category')}
        >
          Sort by Category
        </button>
        <button
          className={`p-2 ${sortBy === 'groupedCategory' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSortBy('groupedCategory')}
        >
          Group by Category
        </button>
      </div>
      <ul className="list-none">
        {renderItems()}
      </ul>
    </div>
  );
}


