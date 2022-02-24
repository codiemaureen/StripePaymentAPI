const stripe = require('stripe')(process.env.STRIPE_API_KEY);

exports.stripe = async (req, res) => {
    const {purchase, total_amount, shipping_fee} = req.body;
    const calculateOrderAmount = () => {
        return total_amount + shipping_fee;
    };
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
    });
    console.log(paymentIntent);
    res.json({ clientSecret: paymentIntent.client_secret});
};