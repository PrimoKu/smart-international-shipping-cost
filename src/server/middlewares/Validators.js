const {check, validationResult} = require('express-validator');
const GroupOrder = require("../models/GroupOrder");
const { USStates } = require("../enums/USStatesEnums");

exports.OrderCreateValidator = [
    check('name')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Order name can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Order name requires a minimum 3 of characters!')
        .bail(),
    check('weight')
        .not()
        .isEmpty()
        .withMessage('Weight can not be empty!')
        .bail()
        .isInt({gt: 0})
        .withMessage('Weight greater than zero!')
        .bail(),
    check('price')
        .not()
        .isEmpty()
        .withMessage('Price can not be empty!')
        .bail()
        .isInt({gt: 0})
        .withMessage('Price greater than zero!')
        .bail(),
    check('groupOrder_id')
        .not()
        .isEmpty()
        .withMessage('GroupOrder ID can not be empty!')
        .bail()
        .custom(async (groupOrder_id, { req }) => {
            const groupOrder = await GroupOrder.findById(groupOrder_id);
            if (!groupOrder) {
                throw new Error('Invalid groupOrder_id! GroupOrder not found.');
            }
            return true;
        })
        .bail(),
   (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        next();
    },
];

exports.OrderUpdateValidator = [
    check('name')
        .optional()
        .escape()
        .isLength({min: 3})
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('weight')
        .optional()
        .isInt({gt: 0})
        .withMessage('Weight should greater than zero!')
        .bail(),
    check('price')
        .optional()
        .isInt({gt: 0})
        .withMessage('Price should greater than zero!')
        .bail(),
   (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        next();
    },
];

exports.GroupOrderCreateValidator = [
    check('name')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Group Order name can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Group Order name requires a minimum 3 of characters!')
        .bail(),
    check('country')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Group Order country can not be empty!')
        .bail(),
        // .isLength({min: 3})
        // .withMessage('Group Order country requires a minimum 3 of characters!')
        // .bail(),
   (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        next();
    },
];

exports.ShipmentCreateValidator = [
    check('firstName')
        .escape()
        .not()
        .isEmpty()
        .withMessage('First name can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('First name requires a minimum 3 of characters!')
        .bail(),
    check('lastName')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Last name can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Last name requires a minimum 3 of characters!')
        .bail(),
    check('address1')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Address 1 can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Address 1 requires a minimum 3 of characters!')
        .bail(),
    check('address2')
        .escape()
        .optional({ checkFalsy: true })
        .isEmpty()
        .isLength({min: 3})
        .withMessage('Address 2 requires a minimum 3 of characters!')
        .bail(),
    check('state')
        .escape()
        .not()
        .isEmpty()
        .withMessage('State can not be empty!')
        .bail()
        .custom((value) => {
            const statesValues = Object.values(USStates);
            return statesValues.includes(value);
        })
        .withMessage('Invalid state provided!')
        .bail(),
    check('city')
        .escape()
        .not()
        .isEmpty()
        .withMessage('City can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('City requires a minimum 3 of characters!')
        .bail(),
    check('zipCode')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Zip code can not be empty!')
        .bail()
        .isLength({min: 5})
        .withMessage('Zip code requires a minimum 5 of characters!')
        .bail(),
   (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        next();
    },
];

exports.PaymentCreateValidator = [
    check('cardType')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Card type can not be empty!')
        .bail()
        .isIn(['Credit', 'Debit'])
        .withMessage('Card type must be either "Credit" or "Debit"!')
        .bail(),
    check('cardNumber')
        .not()
        .isEmpty()
        .withMessage('Card number cannot be empty!')
        .bail()
        .isNumeric()
        .withMessage('Card number must be numeric!')
        .bail()
        .isLength({ min: 13, max: 19 })
        .withMessage('Card number must be between 13 and 19 digits long!')
        .bail(),
    check('bankName')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Bank name can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Bank name requires a minimum 3 of characters!')
        .bail(),
    check('billAddress1')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Billing address 1 can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Billing address 1 requires a minimum 3 of characters!')
        .bail(),
    check('billAddress2')
        .escape()
        .optional({ checkFalsy: true })
        .isEmpty()
        .isLength({min: 3})
        .withMessage('Billing address 2 requires a minimum 3 of characters!')
        .bail(),
    check('state')
        .escape()
        .not()
        .isEmpty()
        .withMessage('State can not be empty!')
        .bail()
        .custom((value) => {
            const statesValues = Object.values(USStates);
            return statesValues.includes(value);
        })
        .withMessage('Invalid state provided!')
        .bail(),
    check('city')
        .escape()
        .not()
        .isEmpty()
        .withMessage('City can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('City requires a minimum 3 of characters!')
        .bail(),
    check('zipCode')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Zip code can not be empty!')
        .bail()
        .isLength({min: 5})
        .withMessage('Zip code requires a minimum 5 of characters!')
        .bail(),
   (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        next();
    },
];

exports.UserRegisterValidator = [
    check('name')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Name can not be empty!')
        .bail()
        .isLength({min: 5})
        .withMessage('Name requires a minimum 5 of characters!')
        .bail()
        .matches(/^[A-Za-z0-9_. -]+$/)
        .withMessage('Name should only contains letters, numbers, hyphens and underscores')
        .bail(),
    check('email')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Email can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Email requires a minimum 5 of characters!')
        .bail()
        .isEmail()
        .withMessage('Invalid email!')
        .bail()
        .normalizeEmail({ gmail_remove_dots: false }),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password can not be empty!')
        .bail()
        .matches(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z@]{8,}$/, "i")
        .withMessage('Password must be at least 8 characters long and contain at least one letter and one number')
        .bail(),
   (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        next();
    },
];

exports.UserUpdateValidator = [
    check('name')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Name can not be empty!')
        .bail()
        .isLength({min: 5})
        .withMessage('Name requires a minimum 5 of characters!')
        .bail()
        .matches(/^[A-Za-z0-9_. -]+$/)
        .withMessage('Name should only contains letters, numbers, hyphens and underscores')
        .bail(),
    check('email')
        .escape()
        .not()
        .isEmpty()
        .withMessage('Email can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Email requires a minimum 5 of characters!')
        .bail()
        .isEmail()
        .withMessage('Invalid email!')
        .bail()
        .normalizeEmail({ gmail_remove_dots: false }),
    check('password')
        .optional()
        .matches(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z@]{8,}$/, "i")
        .withMessage('Password must be at least 8 characters long and contain at least one letter and one number')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        next();
    },
];