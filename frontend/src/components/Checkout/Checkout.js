import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Navbar from "../layout/Navbar";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <NavLink style={{ color: "inherit" }} to="/">
        FoodHub
      </NavLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Delivery address", "Payment details", "Review your order"];

const theme = createTheme();

export default function Checkout() {
  const navigate = useNavigate();
  const { refresh, setRefresh } = React.useContext(UserContext);

  const [placedOrderId, setPlacedOrderId] = React.useState();
  const [userData, setUserData] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(0);

  const [payment_mode, setPaymentMode] = React.useState("Cash on Delivery");
  const [orderItems, setOrderItems] = React.useState([{}]);

  const [values, setValues] = React.useState({
    address1: "",
    address2: "",
    city: "",
    zip: "",
  });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm values={values} setValues={setValues} />;
      case 1:
        return (
          <PaymentForm
            payment_mode={payment_mode}
            setPaymentMode={setPaymentMode}
          />
        );
      case 2:
        return (
          <Review
            orderItems={orderItems}
            setOrderItems={setOrderItems}
            values={values}
            payment_mode={payment_mode}
            userData={userData}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    if (activeStep) {
      setActiveStep(activeStep + 1);
      if (activeStep == 2) {
        placeOrder();
      }
    } else if (values.address1 && values.city && values.zip) {
      
      const regex_mobile = /^[0-9]{5,10}$/;
      
      if(!(regex_mobile.test(values.zip))){
        window.alert("Please enter a valid zip/postal code of length between 5 to 10 digits");
        return;
      }
      
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const placeOrder = async () => {
    const userId = userData._id;
    const restaurantId = orderItems[0].restaurant_id;
    const total_amount = orderItems.reduce(
      (sum, orderItem) => sum + orderItem.amount,
      0
    );
    const delivery_address = values;

    try {
      const res = await fetch("/api/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          restaurantId,
          total_amount,
          delivery_address,
          payment_mode,
          orderItems,
        }),
      });

      const placedOrder = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
        window.alert(res.err);
      } else {
        setPlacedOrderId(placedOrder._id);
        sessionStorage.removeItem("cartDishes");
        setRefresh(!refresh);
      }
    } catch (err) {
      console.log(err);
      navigate("/signin");
    }
  };

  const getUserData = async () => {
    try {
      const res = await fetch("/api/get-user-data", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
      } else {
        setUserData(data);
      }
    } catch (err) {
      console.log(err);
      navigate("/signin");
    }
  };

  const callCheckoutPage = async () => {
    const items = await sessionStorage.getItem("cartDishes");

    if (!sessionStorage.getItem("isLoggedIn")) {
      navigate("/signin");
    }

    if (items) {
      const itemsJson = JSON.parse(items);

      if (itemsJson.length > 0) {
        getUserData();
      } else navigate("/");
    } else navigate("/");
  };

  React.useEffect(() => {
    callCheckoutPage();
  }, []);

  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        ></AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 3 }}>
              {steps.map((label) => (
                <Step
                  key={label}
                  sx={{
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "rgb(196, 8, 8)", // circle color (COMPLETED)
                    },
                    "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                      {
                        color: "grey.500", // Just text label (COMPLETED)
                      },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "rgb(196, 8, 8)", // circle color (ACTIVE)
                    },
                    "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                      {
                        color: "common.white", // Just text label (ACTIVE)
                      },
                    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                      fill: "common.white", // circle's number (ACTIVE)
                    },
                  }}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <img src={require("../../assets/img/thank-note.jpg")} className="card-img-top" alt="..." />
                  <Typography variant="subtitle1" style={{textAlign:'center', marginTop:'1rem'}}>
                    Your order ID is {placedOrderId}.<br/>
                    Current orders can be seen on your account page.<br/>
                    We have notified the restaurant about your order, they will be contacting you soon.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <NavLink to="/cart">
                        <Button sx={{ mt: 3, ml: 1, color: "error.main" }}>
                          Cancel
                        </Button>
                      </NavLink>
                    </div>
                    <Box
                      sx={{ display: "flex", justifyContent: "flex-start " }}
                    >
                      {activeStep !== 0 && (
                        <Button
                          onClick={handleBack}
                          sx={{ mt: 3, ml: 1, color: "error.main" }}
                        >
                          Back
                        </Button>
                      )}

                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1, bgcolor: "error.main" }}
                      >
                        {activeStep === steps.length - 1
                          ? "Place order"
                          : "Next"}
                      </Button>
                    </Box>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
    </>
  );
}
