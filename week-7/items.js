export default function Item({name, quantity, category}) {
    return (
      <li className="border p-4 mb-2   bg-gray-800 border-gray-700 rounded text-white">
        <p className="font-bold capitalize">{name}</p>
        <p>Buy {quantity} in {category}</p>
      </li>
    );
  }
