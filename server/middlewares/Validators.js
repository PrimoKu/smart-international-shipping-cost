const {check, validationResult} = require('express-validator');

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