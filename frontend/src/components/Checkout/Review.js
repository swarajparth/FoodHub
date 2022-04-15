import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  }
];

const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

export default function Review({userData, values, payment_mode, orderItems, setOrderItems}) {

    React.useEffect(() => {
        const items = sessionStorage.getItem('cartDishes');
        if (items.length > 0) {
          const itemsJson = JSON.parse(items);
          setOrderItems(itemsJson);
        }
      }, [])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {orderItems.map((orderItem) => (
          <ListItem key={orderItem.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={orderItem.name} secondary={orderItem.quantity} />
            <Typography variant="body2">₹{orderItem.amount}</Typography>
          </ListItem>
        ))}

        <hr/>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₹{orderItems.reduce((sum, orderItem) => sum + (orderItem.amount), 0)}
          </Typography>
        </ListItem>

        <hr/>
                
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Delivery
          </Typography>
          <Typography gutterBottom>{userData.name}</Typography>
          <Typography gutterBottom>{values.address1}&nbsp;{values.address2 }<br/>
            {values.city}<br/>
            {values.zip}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment method
          </Typography>
          <Grid container>
            {/* {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))} */}
                <Grid item >
                  <Typography gutterBottom>{payment_mode}</Typography>
                </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr/>


    </React.Fragment>
  );
}