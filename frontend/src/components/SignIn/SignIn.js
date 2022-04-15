import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import "../NavLink.css";
import { UserContext } from "../../App";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <NavLink style={{ color: "inherit" }} to="/">
        FoodHub
      </NavLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const { state, dispatch } = React.useContext(UserContext);
  const { state2, dispatch2 } = React.useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(async () => {
    const isCartNotEmpty = await sessionStorage.getItem("cartDishes");

    if (state2) {
      navigate("/", { replace: true });
    } else if (state) {
      if (isCartNotEmpty) {
        navigate("/checkout", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [state, state2]);

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const handleChangeValues = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = values;

    const regex_email =
      /^([a-z A-Z 0-9 \.-_]+)@([a-z A-Z 0-9 \.-_]+)\.([a-z]+)(\.[a-z]{2,5})?$/;
    //purpose of ? is it makes regex exp optional like whatever part u want

    if (!regex_email.test(email)) {
      window.alert("Please enter a valid email");
      return;
    }

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!data) {
      window.alert("Technical error");
      console.log("Technical error");
    } else if (res.status === 422 || res.status === 400) {
      window.alert(data.error);
      console.log(data.error);
    } else {
      dispatch(true);

      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("userId", data._id);

      console.log(data.message);

      const isCartNotEmpty = await sessionStorage.getItem("cartDishes");

      if (isCartNotEmpty) {
        navigate("/checkout", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <>
      <Navbar />

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                value={values.email}
                onChange={handleChangeValues("email")}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                value={values.password}
                onChange={handleChangeValues("password")}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "error.main" }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <NavLink className="nav-link" to="/forgot-password">
                    Forgot password?
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
