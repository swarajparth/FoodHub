import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Navbar from "../layout/Navbar";

const SignOut = () => {
  //using promises

  const { state, dispatch } = React.useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/signout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch(false);
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("cartDishes");
        sessionStorage.removeItem("userId");
        navigate("/signin", { replace: true });

        if (!(res.status === 200)) {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <Navbar />
    </>
  );
};

export default SignOut;
