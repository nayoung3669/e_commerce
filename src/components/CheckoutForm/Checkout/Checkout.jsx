import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';

import { commerce } from '../../../lib/commerce';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import Review from '../Review'

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    
    const classes = useStyles();

    useEffect(()=> {
        if (cart.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                    setCheckoutToken(token);
                } catch (e) {
                    console.log(e.message);
                }
            };
            generateToken();
        }
    },[cart]);

    const nextStep = () => setActiveStep((prevActivestep) => prevActivestep + 1)
    const backStep = () => setActiveStep((prevActivestep) => prevActivestep - 1)

    const next = (data) => { 
        setShippingData(data);
         
        nextStep();
    }

    const Confirmation = () => (
        <Review />
    );

    const Form = () =>  activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} /> 
        : <PaymentForm checkoutToken={checkoutToken} shippingData={shippingData} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} />

    return (
        <>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h4' align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> } 
            </Paper>
        </main>
        </>
    )
};

export default Checkout; 