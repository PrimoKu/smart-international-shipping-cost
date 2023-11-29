const Payment = require("../models/Payment");

const get = async (user_id) => {
    const payment = await Payment.find({user_id: user_id});
    return payment[0];
}

const create = async (user_id, card_type, card_number, bank_name, bill_address_1, bill_address_2, state, city, zip_code) => {
    const payment = await Payment.create({ user_id, card_type, card_number, bank_name, bill_address_1, bill_address_2, state, city, zip_code });
    return payment;
}

const update = async (user_id, data) => {
    const payment = await Payment.findOneAndUpdate( { user_id: user_id }, data, { new: true } );
    return payment;
}

module.exports = {
    get,
    create,
    update,
}