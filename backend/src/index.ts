import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

interface Apartment {
  id: number;
  title: string;
  price: number;
  location: string;
}

const apartments: Apartment[] = [
  { id: 1, title: "Modern 2-Bedroom Downtown", price: 1200, location: "Downtown" },
  { id: 2, title: "Studio Midtown", price: 900, location: "Midtown" },
  { id: 3, title: "Luxury 3-Bedroom Uptown", price: 2000, location: "Uptown" },
];

// Get all apartments
app.get("/api/apartments", (req: Request, res: Response) => {
  res.json(apartments);
});

// Get one apartment by ID
app.get("/api/apartments/:id", (req: Request, res: Response) => {
  const apartment = apartments.find(a => a.id === parseInt(req.params.id));
  if (!apartment) return res.status(404).json({ error: "Not found" });
  res.json(apartment);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
