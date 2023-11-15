const asyncHandler = require("express-async-handler");
const paymentRepo = require("../repositories/PaymentRepository");

class PaymentController {

    //@des Get payment by user id
    //@route GET /api/payments
    //@access private
    getPayment = asyncHandler( async (req, res) => {
        try {
            const payment = await paymentRepo.get(req.user.id);
            if(!payment) {
                return res.status(404).json({ message: "Payment not found!" });
            }
            res.status(200).json(payment);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Create new payment by user id
    //@route POST /api/payments
    //@access private
    createPayment = asyncHandler( async (req, res) => {
        const { cardType, cardNumber, bankName, billAddress1, billAddress2, state, city, zipCode } = req.body;
        let payment;
        try {
            payment = await paymentRepo.create(req.user.id, cardType, cardNumber, bankName, billAddress1, billAddress2, state, city, zipCode);
            if(payment) {
                return res.status(201).json(payment);
            } else {
                return res.status(442).json({ message: "Create payment failed!" });
            }
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Update payment by user id
    //@route PUT /api/payments
    //@access private
    updatePayment = asyncHandler( async (req, res) => { 
        const payment = await paymentRepo.get(req.user.id);
        try {
            if(!payment) {
                return res.status(404).json({ message: "Payment not found!" });
            } 
            const updatedPayment = await paymentRepo.update(req.params.id, req.body);
            res.status(200).json(updatedPayment);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Upsert payment information
    //@route POST /api/payments/upsert
    //@access private
    upsertPayment = asyncHandler(async (req, res) => {
        console.log(req.body);
        const { cardType, cardNumber, bankName, billAddress1, billAddress2, state, city, zipCode } = req.body;
        try {
            let payment = await paymentRepo.get(req.user.id);

            if (payment) {
                payment = await paymentRepo.update(req.user.id, { cardType, cardNumber, bankName, billAddress1, billAddress2, state, city, zipCode });
            } else {
                payment = await paymentRepo.create(req.user.id, cardType, cardNumber, bankName, billAddress1, billAddress2, state, city, zipCode);
            }

            return res.status(200).json(payment);

        } catch (error) {
            console.error('Error upserting payment information:', error);
            return res.status(500).json({ message: "Server Error!" });
        }
    });
}

module.exports = PaymentController;