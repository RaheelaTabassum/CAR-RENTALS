export default function Dashboard() {
  const cards = [
    { title: "Users", description: "Manage users", total: 3 },
    { title: "Cars", description: "Manage cars", total: 12 },
    { title: "Bookings", description: "View bookings", total: 7 },
    { title: "Settings", description: "System settings", total: "Configure system" },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg"
        >
          <h2 className="text-lg font-bold">{card.title}</h2>
          <p>{card.description}</p>
          <p className="mt-2 text-sm text-gray-600">
            <b>Total:</b> {card.total}
          </p>
        </div>
      ))}
    </div>
  );
}
