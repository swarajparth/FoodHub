import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../NavLink.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Navbar from "../layout/Navbar";

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

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
    showPassword: false,
    showConfirm_Password: false,
  });

  const handleChangeValues = (prop) => (event) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, mobile, password, confirm_password } = values;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        password,
        confirm_password,
      }),
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert(data.error);
      console.log(data.error);
    } else {
      window.alert(data.message);
      console.log(data.message);
      navigate("/signin");
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
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="off"
                    name="name"
                    value={values.name}
                    onChange={handleChangeValues("name")}
                    required
                    fullWidth
                    id="name"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="off"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChangeValues("mobile")}
                    required
                    fullWidth
                    id="mobile"
                    label="Contact"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={values.email}
                    onChange={handleChangeValues("email")}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl required fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChangeValues("password")}
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
                      label="Password"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl required fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirm_password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-confirm_password"
                      type={values.showConfirm_Password ? "text" : "password"}
                      value={values.confirm_password}
                      onChange={handleChangeValues("confirm_password")}
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
                      label="Confirm Password"
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
                Register
              </Button>

              <Grid container justifyContent="center">
                <Grid item>Have an account?</Grid>
                <NavLink className="nav-link" to="/signin">
                  Sign in
                </NavLink>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: "30%" }} />
        </Container>
      </ThemeProvider>
    </>
  );
}