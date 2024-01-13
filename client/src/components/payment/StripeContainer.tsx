import React from 'react'
import {Typography} from 'antd';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import PaymentForm from './PaymentForm';
import { useLocation } from 'react-router-dom';

const PUBLIC_KEY = 'pk_test_51NjGwwF68zoukP3kraLyTwjsPcTvdtrsT7ZvA2mHw0k8R8JyRxCG6CiJaEzgRKEgrimxjDWbCvwNTUYXz0TAQ4c200siq8i4Ut';

const {Title} = Typography;

const stripePromise =  loadStripe(PUBLIC_KEY);
const StripeContainer = () => {
    const {state} = useLocation();
    if(!state?.total || state?.total === 0) {
        return (
            <div style={{padding: 30}}>
                <Title>Payment is not processed</Title>
            </div>
        )
    }
  return (
    (
        <div style={{padding: 20}}>
             <Elements stripe={stripePromise}>
                <Title>Total: ${state?.total}</Title>
        <PaymentForm  amount={state?.total} />
     </Elements>
        </div>
    
    )
  )
}

export default StripeContainer