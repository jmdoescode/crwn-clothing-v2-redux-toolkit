require("dotenv").config(); //require is an old version of import
const stripe = require("stripe")("sk_test_51NV7vuBokOBEeErhg7HHHbRq1XLC8lmfgRQ7dF1nOBmPMEObJ4kxZnjpjWMVNL8jh5UR7WFFt3zBKbEdi9m78Ool00G1kauhp9");
//console.log('STRIPE_SECRET_KEY', process.env.STRIPE_SECRET_KEY);
//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
	try {
		const { amount } = JSON.parse(event.body); //pass in cents (no .)

		//make a payment intent
		const payementIntent = await stripe.paymentIntents.create({
			amount,
			currency: "usd",
			payment_method_types: ["card"],
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ payementIntent }),
		};
	} catch (error) {
		console.log({ error });

		return {
			status: 400,
			body: JSON.stringify({ error }),
		};
	}
};
