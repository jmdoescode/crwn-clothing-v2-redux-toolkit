import {
	CardElement,
	useStripe,
	useElements,
	setClientSecret,
} from "@stripe/react-stripe-js";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentsFormContainer, FormContainer } from "./payment-form.styles";

export const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const paymentHandler = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		//create payment intent
		//route relative to your url
		const response = await fetch("/.netlify/functions/create-payment-intent", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*", //Added bc getting error: "blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requeseted resource
			},
			body: JSON.stringify({ amount: 10000 }),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));

		console.log("response", response);

		// const { paymentIntent } = response;
		// console.log('paymentIntent', paymentIntent);

		//const clientSecret = response.payementIntent.client_secret; //other way to get clientSecret
		const {
			payementIntent: { client_secret }, //make sure payment is payEment
		} = response;
		// console.log('client_secret', client_secret);

		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: "Test User",
				},
			},
		});

		console.log('paymentResult', paymentResult);

		if (paymentResult.error) {
			alert(paymentResult.error);
		} else {
			if (paymentResult.payementIntent.status === "succeeded") {
				alert("Payment Suceeded");
			}
		}
	};

	return (
		<PaymentsFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				<CardElement />
				{/*Any button inside the form container will automatically be a submission button*/}
				<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
			</FormContainer>
		</PaymentsFormContainer>
	);
};

export default PaymentForm;
