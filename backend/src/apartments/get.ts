import { Request, Response } from "express";
import { getAllApartmentsFromDB, getApartmentByIdFromDB } from '../db/queries';

// Get all apartments
export const getAllApartments = async (req: Request, res: Response) => {
  console.log("GET all apartments request received");
  try {
    const apartments = await getAllApartmentsFromDB();
    res.json(apartments);
  } catch (err) {
    console.error("Error fetching apartments:", err);
    res.status(500).json({ error: "Failed to fetch apartments" });
  }
};

// Get one apartment by ID
export const getApartmentById = async (req: Request, res: Response) => {
  try {
    const apartment = await getApartmentByIdFromDB(parseInt(req.params.id));
    if (!apartment) return res.status(404).json({ error: "Not found" });
    res.json(apartment);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch apartment" });
  }
};
