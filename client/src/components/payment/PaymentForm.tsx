import React, { useState } from 'react'
import axios from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

interface IPayemntFormProps {
    amount: number;
}

const PaymentForm = ({amount}: IPayemntFormProps) => {
    const [isSuccess, setIsSuccess] = useState(false)

    const elements = useElements();
    const stripe = useStripe();

  const handleSubmit=async(e: any)=>{
    e.preventDefault();
    const {error, paymentMethod} = await (stripe!).createPaymentMethod({
        type:'card',
        card: (elements!).getElement(CardElement)
    } as any);

    if(!error) {
        const {id} =paymentMethod;
        const response = await axios.post('http://localhost:7000/payment',{id, amount });

        if(response.data.success) {
            setIsSuccess(true);
        
    }

  }
}
  return (
    <div>
    {isSuccess ? (
        <p>Yaaayy</p>
    ): (
         <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS as any}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
    )}
    </div>
  )
}

export default PaymentForm;