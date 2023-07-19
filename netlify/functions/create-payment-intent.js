require("dotenv").config(); //require is an old version of import
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

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
