import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

export default function Review({
  userData,
  values,
  payment_mode,
  orderItems,
  setOrderItems,
}) {
  React.useEffect(() => {
    const items = sessionStorage.getItem("cartDishes");
    if (items.length > 0) {
      const itemsJson = JSON.parse(items);
      setOrderItems(itemsJson);
    }
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {orderItems.map((orderItem) => (
          <ListItem key={orderItem.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={orderItem.name}
              secondary={orderItem.quantity}
            />
            <Typography variant="body2">₹{orderItem.amount}</Typography>
          </ListItem>
        ))}

        <hr />

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₹{orderItems.reduce((sum, orderItem) => sum + orderItem.amount, 0)}
          </Typography>
        </ListItem>

        <hr />
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Delivery
          </Typography>
          <Typography gutterBottom>{userData.name}</Typography>
          <Typography gutterBottom>
            {values.address1}&nbsp;{values.address2}
            <br />
            {values.city}
            <br />
            {values.zip}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment method
          </Typography>
          <Grid container>
            <Grid item>
              <Typography gutterBottom>{payment_mode}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr />
    </React.Fragment>
  );
}
