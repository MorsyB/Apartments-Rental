import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { getAllApartments, getApartmentById } from "./apartments/get";
import { updateApartment } from "./apartments/put";
import { createApartment } from "./apartments/post";

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://apartments-rental-1.onrender.com'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb+srv://morsyb6c_db_user:dbpass@ar-test.iuvd0rv.mongodb.net/?retryWrites=true&w=majority&appName=ar-test";
mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error("Failed to connect to MongoDB", err));

// Get all apartments
app.get("/api/apartments", async (req: Request, res: Response) => getAllApartments(req, res));
// Get one apartment by ID
app.get("/api/apartments/:id", async (req: Request, res: Response) => getApartmentById(req, res));
// Create new apartment
app.post("/api/apartments", async (req: Request, res: Response) => createApartment(req, res));
// Update apartment by ID
app.put("/api/apartments/:id", async (req: Request, res: Response) => updateApartment(req, res));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
