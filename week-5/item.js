export default function item({name, quantity, category}) {
  return (
    <main className="bg-gray-200 p-4 rounded-md ">
      <div className="font-bold text-lg">{name}</div>
      <div className="text-gray-600">Quantity: {quantity}</div>
      <div className="text-gray-600">Category: {category}</div>
    </main>
  );
};

