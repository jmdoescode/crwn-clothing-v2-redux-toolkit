import { CardElement } from "@stripe/react-stripe-js";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentsFormContainer, FormContainer } from "./payment-form.styles";

export const PaymentForm = () => {
	return (
		<PaymentsFormContainer>
			<FormContainer>
      <h2>Credit Card Payment: </h2>
				<CardElement />
				<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
			</FormContainer>
		</PaymentsFormContainer>
	);
};

export default PaymentForm;
