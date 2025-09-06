interface Apartment {
  id: number;
  title: string;
  price: number;
  location: string;
}

export default async function ListingsPage() {
  const res = await fetch("http://localhost:5000/api/apartments");
  const apartments: Apartment[] = await res.json();

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {apartments.map((apt) => (
        <div key={apt.id} className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">{apt.title}</h2>
          <p className="text-gray-700 mb-1">Location: {apt.location}</p>
          <p className="text-blue-600 font-semibold">${apt.price}/month</p>
        </div>
      ))}
    </div>
  );
}
