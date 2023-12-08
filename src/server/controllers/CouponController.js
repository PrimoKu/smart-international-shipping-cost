const asyncHandler = require("express-async-handler");
const couponRepo = require("../repositories/CouponRepository");

class CouponController {

    //@des Get all coupons
    //@route GET /api/coupons/
    //@access private
    getCoupons = asyncHandler( async (req, res) => {
        try {
            const coupons = await couponRepo.getAll();
            res.status(200).json(coupons);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Create new coupon
    //@route POST /api/coupons
    //@access private
    createCoupon = asyncHandler( async (req, res) => {
        const { name, code, discount, expire_date } = req.body;
        let coupon;
        try {
            coupon = await couponRepo.create(name, code, discount, expire_date);
            if(coupon) {
                return res.status(201).json(coupon);
            } else {
                return res.status(442).json({ message: "Create coupon failed!" });
            }
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Update coupon by id
    //@route PUT /api/coupons/:id
    //@access private
    updateCoupon = asyncHandler( async (req, res) => { 
        const coupon = await couponRepo.get(req.params.id);
        try {
            if(!coupon) {
                return res.status(404).json({ message: "Coupon not found!" });
            } 
            console.log(coupon);
            const updatedCoupon = await couponRepo.update(req.params.id, req.body);
            res.status(200).json(updatedCoupon);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Get coupon by id
    //@route GET /api/coupons/:id
    //@access private
    getCoupon = asyncHandler( async (req, res) => {
        const coupon = await couponRepo.get(req.params.id);
        try {
            if(!coupon) {
                return res.status(404).json({ message: "Coupon not found!" });
            }
            res.status(200).json(coupon);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });
}

module.exports = CouponController;