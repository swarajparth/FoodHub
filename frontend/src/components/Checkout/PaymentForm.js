import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function PaymentForm({payment_mode, setPaymentMode}) {

  const handleChange = (event) => {
    setPaymentMode( event.target.value );
    console.log(event.target.value)
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>



      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="Cash on Delivery"
          onChange={handleChange}
          control={<Radio />}
          label="Cash on Delivery"
        />

        <FormControlLabel
          value="Razorpay Payment Gateway"
          onChange={handleChange}
          control={<Radio />}
          label="Razorpay Payment Gateway"
        />
      </RadioGroup>
    </FormControl>



      {/* <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value={payment_mode}
          checked={true}
          onChange={handleChange}
          control={<Radio />}
          label="Cash on Delivery"
        />

        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="Card"
        />
      </RadioGroup>
    </FormControl>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
}