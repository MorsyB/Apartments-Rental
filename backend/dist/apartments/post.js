"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApartment = void 0;
const queries_1 = require("../db/queries");
// Create new apartment
const createApartment = async (req, res) => {
    try {
        const { id, title, price, location, beds, baths, size, image, amenities } = req.body;
        const newApartment = await (0, queries_1.createApartmentInDB)({ id, title, price, location, beds, baths, size, image, amenities });
        res.status(201).json(newApartment);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create apartment" });
    }
};
exports.createApartment = createApartment;
