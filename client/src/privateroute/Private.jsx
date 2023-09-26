import { useState, useEffect } from "react";
import { useAuth } from "../context/auth.jsx";
import { Outlet } from "react-router-dom";
import axios from "axios";
import React from "react";
import Spinner from "./../components/Spinner";

export const Private = () => {
  const [ok, setOk] = useState();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get("/quora/v1/auth/protected");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) checkAuth();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
};
