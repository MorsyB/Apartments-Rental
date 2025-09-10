"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApartmentById = exports.getAllApartments = void 0;
const queries_1 = require("../db/queries");
// Get all apartments
const getAllApartments = async (req, res) => {
    console.log("GET all apartments request received");
    try {
        const apartments = await (0, queries_1.getAllApartmentsFromDB)();
        res.json(apartments);
    }
    catch (err) {
        console.error("Error fetching apartments:", err);
        res.status(500).json({ error: "Failed to fetch apartments" });
    }
};
exports.getAllApartments = getAllApartments;
// Get one apartment by ID
const getApartmentById = async (req, res) => {
    try {
        const apartment = await (0, queries_1.getApartmentByIdFromDB)(parseInt(req.params.id));
        if (!apartment)
            return res.status(404).json({ error: "Not found" });
        res.json(apartment);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch apartment" });
    }
};
exports.getApartmentById = getApartmentById;
