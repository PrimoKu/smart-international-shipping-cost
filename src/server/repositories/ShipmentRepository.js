const Shipment = require("../models/Shipment");

const get = async (user_id) => {
    const shipment = await Shipment.find({user_id: user_id});
    return shipment[0];
}

const create = async (user_id, first_name, last_name, address_1, address_2, state, city, zip_code) => {
    const shipment = await Shipment.create({ user_id, first_name, last_name, address_1, address_2, state, city, zip_code });
    return shipment;
}

const update = async (user_id, data) => {
    const shipment = await Shipment.findOneAndUpdate( { user_id: user_id }, data, { new: true } );
    return shipment;
}

module.exports = {
    get,
    create,
    update,
}