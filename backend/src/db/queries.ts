import { ApartmentModel } from '../apartments/model';

export const getAllApartmentsFromDB = async () => {
  const apartments = await ApartmentModel.find();
  return apartments;
};

export const getApartmentByIdFromDB = async (id: number) => {
  const apartment = await ApartmentModel.findOne({ id });
  return apartment;
};

export const updateApartmentInDB = async (id: number, data: { title: string; price: number; location: string }) => {
  const apartment = await ApartmentModel.findOneAndUpdate(
    { id },
    data,
    { new: true }
  );
  return apartment;
};

export const createApartmentInDB = async (data: { id: number; title: string; price: number; location: string; beds: number; baths: number; size: string; image: string; amenities: string[] }) => {
  const newApartment = new ApartmentModel(data);
  await newApartment.save();
  return newApartment;
};
