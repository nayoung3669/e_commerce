import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'

const Review = ({ checkoutToken }) => {
    return (
        <>
        <Typography variant="h6" gutterBottom>Order summary</Typography>
        <List>
           {checkoutToken.live.line_items.map((product) => (
                <ListItem style={{padding: '10px 0'}} key={product.name} >
                    <ListItemText primary={product.name} secondary={`Qty: ${product.quality}`} />
                </ListItem>
           ))} 
        </List>
        </>
    )
}

export default Review