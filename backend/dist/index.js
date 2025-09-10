"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const get_1 = require("./apartments/get");
const put_1 = require("./apartments/put");
const post_1 = require("./apartments/post");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://apartments-rental.vercel.app'],
    credentials: true
}));
app.use(express_1.default.json());
// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb+srv://morsyb6c_db_user:dbpass@ar-test.iuvd0rv.mongodb.net/?retryWrites=true&w=majority&appName=ar-test";
mongoose_1.default.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
// Get all apartments
app.get("/api/apartments", async (req, res) => (0, get_1.getAllApartments)(req, res));
// Get one apartment by ID
app.get("/api/apartments/:id", async (req, res) => (0, get_1.getApartmentById)(req, res));
// Create new apartment
app.post("/api/apartments", async (req, res) => (0, post_1.createApartment)(req, res));
// Update apartment by ID
app.put("/api/apartments/:id", async (req, res) => (0, put_1.updateApartment)(req, res));
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
