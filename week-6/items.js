export default function item({name, quantity, category}) {
  return (
    <main className="border p-4 mb-2 bg-gray-800 border-gray-700 rounded text-white">
      <div className="font-bold text-lg">{name}</div>
      <div className="text-gray-600">Quantity: {quantity}</div>
      <div className="text-gray-600">Category: {category}</div>
    </main>
  );
};
