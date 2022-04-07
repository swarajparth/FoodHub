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
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import "../NavLink.css";

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

export default function Forgot_Password() {
  const [sent_otp, updateSentOTP] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [values, setValues] = React.useState({
    otp: "",
    password: "",
    confirm_password: "",
    showPassword: false,
    showConfirm_Password: false,
  });
  const navigate = useNavigate();

  const handleChangeValues = () => (event) => {
    setEmail(event.target.value);
  };

  const handleChangeValues2 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirm_Password = () => {
    setValues({
      ...values,
      showConfirm_Password: !values.showConfirm_Password,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {}, [sent_otp]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const regex_email =
      /^([a-z A-Z 0-9 \.-_]+)@([a-z A-Z 0-9 \.-_]+)\.([a-z]+)(\.[a-z]{2,5})?$/;
    //purpose of ? is it makes regex exp optional like whatever part u want

    if (!regex_email.test(email)) {
      window.alert("Please enter a valid email");
      return;
    }

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!data) {
      window.alert("Technical error");
      console.log("Technical error");
    } else if (res.status !== 200) {
      window.alert(data.error);
      console.log(data.error);
    } else {
      updateSentOTP(1);
      console.log(data.message);
    }
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();

    const { otp, password, confirm_password } = values;

    const regex_password =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex_password.test(password)) {
      window.alert(
        "Password must have:\n\n Minimum 8 characters,\n At least 1 uppercase letter,\n At least 1 lowercase letter,\n At least 1 number,\n At least 1 special character"
      );
      return;
    }

    if (password != confirm_password) {
      window.alert("Password mismatch");
      return;
    }

    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, password, confirm_password, email }),
    });

    const data = await res.json();

    if (!data) {
      window.alert("Technical error");
      console.log("Technical error");
    } else if (res.status !== 200) {
      window.alert(data.error);
      console.log(data.error);
    } else {
      console.log(data.message);
      navigate("/signin", { replace: true });
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
              Forgot Password
            </Typography>

            {sent_otp ? (
              <Box
                component="form"
                onSubmit={handleSubmit2}
                noValidate
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="otp"
                      label="OTP"
                      name="otp"
                      autoComplete="off"
                      value={values.otp}
                      onChange={handleChangeValues2("otp")}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl required fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        New Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChangeValues2("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="New Password"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl required fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-confirm_password">
                        Confirm New Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-confirm_password"
                        type={values.showConfirm_Password ? "text" : "password"}
                        value={values.confirm_password}
                        onChange={handleChangeValues2("confirm_password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm_password visibility"
                              onClick={handleClickShowConfirm_Password}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showConfirm_Password ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm New Password"
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "error.main" }}
                >
                  Change Password
                </Button>
              </Box>
            ) : (
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
                  value={email}
                  onChange={handleChangeValues()}
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "error.main" }}
                >
                  Send OTP
                </Button>
              </Box>
            )}
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
