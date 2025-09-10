"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApartmentInDB = exports.updateApartmentInDB = exports.getApartmentByIdFromDB = exports.getAllApartmentsFromDB = void 0;
const model_1 = require("../apartments/model");
const getAllApartmentsFromDB = async () => {
    const apartments = await model_1.ApartmentModel.find();
    return apartments;
};
exports.getAllApartmentsFromDB = getAllApartmentsFromDB;
const getApartmentByIdFromDB = async (id) => {
    const apartment = await model_1.ApartmentModel.findOne({ id });
    return apartment;
};
exports.getApartmentByIdFromDB = getApartmentByIdFromDB;
const updateApartmentInDB = async (id, data) => {
    const apartment = await model_1.ApartmentModel.findOneAndUpdate({ id }, data, { new: true });
    return apartment;
};
exports.updateApartmentInDB = updateApartmentInDB;
const createApartmentInDB = async (data) => {
    const newApartment = new model_1.ApartmentModel(data);
    await newApartment.save();
    return newApartment;
};
exports.createApartmentInDB = createApartmentInDB;
