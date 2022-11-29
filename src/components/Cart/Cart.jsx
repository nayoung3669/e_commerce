import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import  CardItem from './CartItem/CartItem'
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();
    
    const EmptyCart = () => (
        <Typography variant='subtitle1'>You have no items in your shopping cart, 
            <Link to="/" className={classes.link}> Start adding some</Link>!
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CardItem 
                            item={item}
                            onUpdateCartQty = {handleUpdateCartQty}
                            onRemoveFromCart = {handleRemoveFromCart}
                        />
                    </Grid> 
                ))}
            </Grid>
            <div>
                <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            </div>
            <Button className={classes.emptyButton} onClick= {handleEmptyCart} size="large" type='button' variant='contained' color='secondary'>Empty Cart</Button>
            <Button className={classes.checkoutButton} component= {Link} to="/checkout" size="large" type='button' variant='contained' color='primary'>Checkout</Button>
        </>
    )

    if(!cart.line_items) return 'Loading ... '

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant='h3'>Your Shopping Cart</Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
        </Container>
    )
};

export default Cart;
