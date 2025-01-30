import React, { useState } from "react";
import "./Login.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/reducers/AuthReducers/AuthActions";
import { useCookies } from "react-cookie";
import Loader from "../../components/Loading/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const loginHendler = () => {
    if (
      email.trim() &&
      password.trim() &&
      email.includes("@") &&
      password.trim().length > 5
    ) {
      dispatch(
        login({
          email,
          password,
        })
      ).then((res) => {
        try {
          if (res.payload.token) {
            setCookie("token", res.payload.token);
          }
        } catch (error) {}
      });
    }
  };
  return (
    <div className="Login">
      {isLoading && <Loader />}
      <div className="Login__panel">
        <h1>Login</h1>
        <Input
          value={email}
          setValue={setEmail}
          placeholder={"Email"}
          type="email"
        />
        <Input
          value={password}
          setValue={setPassword}
          placeholder={"Password"}
          type="password"
        />

        <Button onClick={loginHendler}>Sumbit</Button>
      </div>
    </div>
  );
}
