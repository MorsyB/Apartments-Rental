import { Request, Response } from "express";
import { createApartmentInDB } from "../db/queries";

// Create new apartment
export const createApartment = async (req: Request, res: Response) => {
  try {
    const { id, title, price, location, beds, baths, size, image, amenities } = req.body;
    const newApartment = await createApartmentInDB({ id, title, price, location, beds, baths, size, image, amenities });
    res.status(201).json(newApartment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create apartment" });
  }
};
