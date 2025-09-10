"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define Apartment schema
const apartmentSchema = new mongoose_1.default.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    beds: { type: Number, required: true },
    baths: { type: Number, required: true },
    size: { type: String, required: true },
    image: { type: String, required: true },
    amenities: { type: [String], required: true },
});
exports.ApartmentModel = mongoose_1.default.model('test', apartmentSchema);
