import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const STRIPE_PUBLIC_KEY =
  "pk_test_51KtqshEVOOxbvZxN33MPzSeySEDkITSfjMJVInQjsuMS6f2X6NH5U2HYMK9RNk4T95VgYTX56sqcpzBenI7tceFz00PPWz1CI9";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export default function StripeContainer({ course_id, onCompletePurchase }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        course_id={course_id}
        onCompletePurchase={onCompletePurchase}
      />
    </Elements>
  );
}
