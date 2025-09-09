import { Request, Response } from "express";
import { updateApartmentInDB } from "../db/queries";

// Update apartment by ID
export const updateApartment = async (req: Request, res: Response) => {
  console.log("PUT request received for apartment ID:", req.params.id);
  console.log("Request body:", req.body);
  try {
    const { title, price, location } = req.body;
    const apartment = await updateApartmentInDB( Number(req.params.id), { title, price, location });
    if (!apartment) {
      console.log("Apartment not found");
      return res.status(404).json({ error: "Not found" });
    }
    res.json(apartment);
  } catch (err) {
    console.error("Error updating apartment:", err);
    res.status(500).json({ error: "Failed to update apartment" });
  }
};
