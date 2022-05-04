import React, {useState} from "react";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import DataFetchService from "../../services/DataFetchService";
import {Button, FormGroup, Typography} from "@mui/material";
import {CreditCard} from "@mui/icons-material";

export default function PaymentForm({ course_id, onCompletePurchase }) {
  const dfs = new DataFetchService();

  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#00000",
        fontWeight: "500",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "#87BBFD",
        },
      },
      invalid: {
        iconColor: "#FFC7EE",
        color: "#FFC7EE",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    if (!paymentMethod.error) {
      try {
        const { id } = paymentMethod.paymentMethod;
        const response = await dfs.handlePayment(id, 10, course_id);

        if (response.paymentStatus) {
          console.log("Payment Successful", response.paymentInformation);
          onCompletePurchase();
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log("Error", paymentMethod.error);
    }
  };

  return (
    <div>
      {!success ? (
        <div>
          <FormGroup>
            <CardElement options={CARD_OPTIONS} />
          </FormGroup>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CreditCard />}
            onClick={handleSubmit}
          >
            PAY SECURELY WITH STRIPE
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h3">
            Congrats. You have successfully bought the course. Start learning
            right away
          </Typography>
        </div>
      )}
    </div>
  );
}
