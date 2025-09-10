"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApartment = void 0;
const queries_1 = require("../db/queries");
// Update apartment by ID
const updateApartment = async (req, res) => {
    console.log("PUT request received for apartment ID:", req.params.id);
    console.log("Request body:", req.body);
    try {
        const { title, price, location } = req.body;
        const apartment = await (0, queries_1.updateApartmentInDB)(Number(req.params.id), { title, price, location });
        if (!apartment) {
            console.log("Apartment not found");
            return res.status(404).json({ error: "Not found" });
        }
        res.json(apartment);
    }
    catch (err) {
        console.error("Error updating apartment:", err);
        res.status(500).json({ error: "Failed to update apartment" });
    }
};
exports.updateApartment = updateApartment;
