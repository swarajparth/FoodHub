import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function PaymentForm({ payment_mode, setPaymentMode }) {
  const handleChange = (event) => {
    setPaymentMode(event.target.value);
    console.log(event.target.value);
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
    </React.Fragment>
  );
}
