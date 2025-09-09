import { ApartmentModel } from './model';

// Seed initial data
export const seedApartments = async () => {
  try {
    const count = await ApartmentModel.countDocuments();
    console.log("Current apartment count:", count);
      const apartments = [
        { id: 1, title: "Modern 2-Bedroom Downtown", price: 1200, location: "Downtown", beds: 2, baths: 1, size: "900 sq ft", image: "https://picsum.photos/400/250?1", amenities: ["Gym", "Pool"] },
        { id: 2, title: "Studio Midtown", price: 900, location: "Midtown", beds: 0, baths: 1, size: "500 sq ft", image: "https://picsum.photos/400/250?2", amenities: ["Parking"] },
        { id: 3, title: "Luxury 3-Bedroom Uptown", price: 2000, location: "Uptown", beds: 3, baths: 2, size: "1500 sq ft", image: "https://picsum.photos/400/250?3", amenities: ["Elevator", "Gym"] },
      ];
      await ApartmentModel.insertMany(apartments);
      console.log("Seeded initial apartments");
  } catch (err) {
    console.error("Error seeding apartments", err);
  }
};
