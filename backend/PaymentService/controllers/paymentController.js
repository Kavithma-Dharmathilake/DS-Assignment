const stripe = require("stripe")("sk_test_51PE7P8P6kZHWcO3DgNY5pT3TVuYMqYWyK0MJ2AYgW91p0bVDcReGYXVWuqgAjDWmoj6gpo0pjnuStW3HM7i4lsMy00hxOzdGc0");
const { v4: uuidv4 } = require("uuid");
const Payment = require("../models/payment.js");

const processPayment = async (req, res) => {
    try {
        const { products, token, email } = req.body;
        const transactionKeys = uuidv4();

        const totalAmount = products.reduce((total, product) => total + product.price, 0);

        // Extract courseIds from products
        const courseIds = products.map(product => product.courseId).join(', ');

        // Create a charge for the total amount
        const charge = await stripe.charges.create({
            amount: totalAmount * 100,
            currency: "LKR",
            source: token.id,
            description: courseIds
        });
        // Save payment details in MongoDB
        const payment = new Payment({
            paymentId: charge.id,
            totalAmount: totalAmount,
            currency: charge.currency,
            description: courseIds ,
            email: email
        });
        console.log("---Payment---", payment);
        await payment.save();

        res.json({ message: "Stripe payment processed successfully", charge });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing the payment" });
    }
};

const processSinglePayment = async (req, res) => {
    try {
        const { products, token, email } = req.body;
        const transactionKeys = uuidv4();

        const charge = await stripe.charges.create({
            amount: products.price * 100,
            currency: "LKR",
            source: token.id,
            description: products.name
        });
        // Save payment details in MongoDB
        const payment = new Payment({
            paymentId: charge.id,
            totalAmount: products.price,
            currency: charge.currency,
            description: products.name ,
            email: email
        });
        console.log("---Payment---", payment);
        await payment.save();

        res.json({ message: "Stripe payment processed successfully", charge });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing the payment" });
    }
};

const getPayments = async (req, res) => {
    try {
        console.log("---------req----------", req.body);
        let payments;
        if (req.body.role === "admin") {
            // Fetch all payments if user is admin
            payments = await Payment.find();
        } else {
            // Fetch payments based on logged email if user is not admin
            payments = await Payment.find({ email: req.body.email });
        }
        res.json(payments);
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ error: "An error occurred while fetching payments" });
    }
};

module.exports = {
    processPayment,
    processSinglePayment,
    getPayments
};
