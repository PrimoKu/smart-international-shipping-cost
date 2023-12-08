const Coupon = require("../models/Coupon");

const getAll = async (id) => {
    const coupons = await Coupon.find();
    return coupons;
}

const create = async (name, code, discount, expire_date) => {
    const coupon = await Coupon.create({ name, code, discount, expire_date });
    return coupon;
}

const get = async (id) => {
    const coupon = await Coupon.findById(id);
    return coupon;
}

const update = async (id, data) => {
    const coupon = await Coupon.findByIdAndUpdate(id, data, { new: true });
    return coupon;
}

const getByCode = async(code) => {
    const coupon = await Coupon.find({code: code});
    return coupon[0];
}

module.exports = {
    create,
    get,
    getAll,
    getByCode,
    update
}