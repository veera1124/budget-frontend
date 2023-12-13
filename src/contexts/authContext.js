// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import Axios from "../service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate } from 'react-router-dom'
const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {


    const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    refreshToken: "",
    authToken: "",
    email: "",
  });
  const isLoggedin = () => {
    return !!localStorage.getItem("TOKEN")  || !!user.authToken ;
  }
  const login = async (userData) => {
    console.log(userData);
    try{


    // Implement login logic here, set user data after successful authentication
    const response = await Axios.post("/auth/login", {
      email: userData.email,
      password: userData.password,
    });

    console.log(response.data);
    const { token, refreshToken } = response.data;
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // for all requests

    user.authToken = token;
    user.refreshToken = refreshToken;
    localStorage.setItem("TOKEN", token); // save the token in local storage
    localStorage.setItem("REFRESH_TOKEN", refreshToken); // save the token in local storage

    setUser(userData);
     navigate('/dashboard') 
}
    catch(err){
        console.log(err)
        toast('Invalid Mail or Id', err.message)
    }
  };

  const logout = () => {
    // Implement logout logic here, clear user data
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    setUser({
      username: "",
      refreshToken: "",
      authToken: "",
      email: "",
    });

    navigate('/login')
  };
  const signup = async (userData) => {
    try {
      // Implement signup logic here, set user data after successful authentication
      const response = await Axios.post("/auth/register", {
        name: userData.username,
        password: userData.password,
        email: userData.email,
      });
      const { token, refreshToken } = response.data;
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // for all requests

      user.authToken = token;
      user.refreshToken = refreshToken;
      localStorage.setItem("TOKEN", token); // save the token in local storage
      localStorage.setItem("REFRESH_TOKEN", refreshToken); // save the token in local storage

      setUser(user);
      setUser(user);
      setUser(user);
      
      navigate('/dashboard')
    } catch (err) {
      console.log(err);
      toast("Cant signup", err.message);
    }
  };
  const refreshToken = async () => {
    // Implement refresh token logic here
    //console.log(user,user.refreshToken)
    const response = await Axios.post("/auth/getAcessToken", {
      refreshToken: localStorage.getItem("REFRESH_TOKEN") || user.refreshToken,
    });
    const { authToken, refreshToken } = response.data;
    Axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`; // for all requests
    user.authToken = authToken;
    user.refreshToken = refreshToken;

    toast.success("Refreshed token");
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout ,signup,refreshToken,isLoggedin}}>
      {children}
    </AuthContext.Provider>
  );
};
