import React, { useState } from "react";
import "./SignIn.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { register } from "../../store/reducers/AuthReducers/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import Loader from "../../components/Loading/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [feedBack, setFeedBack] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirm, setComfirm] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const loginHendler = () => {
    if (
      password.trim() === comfirm.trim() &&
      name.trim() &&
      email.trim() &&
      password.trim() &&
      password.trim().length > 5
    ) {
      dispatch(
        register({
          fullName: name,
          email,
          password,
        })
      ).then((res) => {
        try {
          if (res.payload.token) {
            setCookie("token", res.payload.token);
          }
        } catch (error) {
          alert(error.message);
        }
      });
    } else {
      alert("Password and comfirm password must be the same");
    }
  };

  return (
    <div className="SignIn">
      {isLoading && <Loader />}

      <div className="SignIn__panel">
        <h1>Sign up</h1>
          <Input value={name} required setValue={setName} placeholder={"Name"} />
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
          <Input
            value={comfirm}
            setValue={setComfirm}
            placeholder={"Repeat"}
            type="password"
          />
          <Button onClick={loginHendler}>
            Sumbit
          </Button>
      </div>
    </div>
  );
}
