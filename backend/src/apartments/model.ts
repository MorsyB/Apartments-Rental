import mongoose from "mongoose";

// Define Apartment schema
const apartmentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  size: { type: String, required: true },
  image: { type: String, required: true },
  amenities: { type: [String], required: true },
});

export const ApartmentModel = mongoose.model('test', apartmentSchema);
