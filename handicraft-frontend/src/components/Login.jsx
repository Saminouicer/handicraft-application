import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import loginImg from "../data/Component_login.png";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Auth = useAuth();
  const location = useLocation();
  // const redirectPath=location.state?.path||"/";

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:8080/authenticate", {
        username,
        password,
      });
      Auth.login(response.data.accessToken);
      localStorage.setItem("jwt", JSON.stringify(response.data.accessToken));
      // navigate(redirectPath,{replace:true})
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
      <div className=" flex justify-center ">
        <div className="login flex justify-between items-center ">
      <div className="image">
        <img src={loginImg} alt="" />
      </div>
      <div className="loginForm">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl mb-4 text-center">Welcome</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#F88D2F] hover:bg-[#e78a39] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <p className="text-center text-l mt-3 text-[#888]">
            Still don't have an account?
            <Link to={'/logup'} className="ml-2 text-[#e78a39]">Sign up</Link>
          </p>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </form>
      </div>
    </div>
      </div>
  );
}
