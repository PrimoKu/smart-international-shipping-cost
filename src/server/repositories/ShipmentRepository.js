const Shipment = require("../models/Shipment");

const get = async (id) => {
    const shipment = await Shipment.findById(id);
    return shipment;
}

const create = async (user_id, first_name, last_name, address_1, address_2, state, city, zip_code) => {
    const shipment = await Shipment.create({ user_id, first_name, last_name, address_1, address_2, state, city, zip_code });
    return shipment;
}

const update = async (id, data) => {
    const shipment = await Shipment.findByIdAndUpdate(id, data, { new: true });
    return shipment;
}

module.exports = {
    get,
    create,
    update,
}