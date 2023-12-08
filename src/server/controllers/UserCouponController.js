const asyncHandler = require("express-async-handler");
const userCouponRepo = require("../repositories/UserCouponRepository");
const couponRepo = require("../repositories/CouponRepository");

class UserCouponController {

    //@des Create new user's coupon
    //@route POST /api/userCoupons
    //@access private
    createUserCoupon = asyncHandler( async (req, res) => {
        const { coupon_code } = req.body;
        let userCoupon;
        try {
            const coupon = await couponRepo.getByCode(coupon_code);
            if(!coupon) { return res.status(442).json({ message: "Coupon doesn't exist!" }); }

            userCoupon = await userCouponRepo.getByBoth(req.user.id, coupon._id);
            if(userCoupon) {
                return res.status(442).json({ message: "Already added!" });
            } else {
                userCoupon = await userCouponRepo.create(req.user.id, coupon._id);
                return res.status(201).json(userCoupon);             
            }
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Get user's coupon by user id
    //@route GET /api/userCoupons/
    //@access private
    getUserCoupons = asyncHandler( async (req, res) => {
        try {
            const userCoupon = await userCouponRepo.getByUser(req.user.id);
            res.status(200).json(userCoupon);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });
}

module.exports = UserCouponController;