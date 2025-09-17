export default function Dashboard() {
  const cards = [
    { title: "Users", description: "Manage users", total: 3 },
    { title: "Cars", description: "Manage cars", total: 12 },
    { title: "Bookings", description: "View bookings", total: 7 },
    { title: "Settings", description: "System settings", total: "Configure system" },
  ];

  return (
    <div className="min-h-screen bg-white p-6 text-black">
      <div className="grid grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-6 bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-lg text-black"
          >
            <h2 className="text-lg font-bold">{card.title}</h2>
            <p>{card.description}</p>
            <p className="mt-2 text-sm">
              <b>Total:</b> {card.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
