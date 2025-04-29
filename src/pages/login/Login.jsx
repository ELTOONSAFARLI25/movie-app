import React, { useEffect, useState } from "react";
import loginCss from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";

import axios from "axios";
import { useFormik } from "formik";
import { Alert } from "@mui/material";
const Login = () => {
  const usersURL = "https://669f8faab132e2c136fe57d0.mockapi.io/users";
  const [usersData, setUsersData] = useState([]);
  const [isVisibilityPassword, setisVisibilityPassword] = useState(false);
  const [isLoginAlert, setIsLoginAlert] = useState(false);
  const [wrongEmailPass, setWrongEmailPass] = useState(false);
  useEffect(() => {
    axios(usersURL).then((res) => {
      setUsersData(res.data);
    });
  }, []);
  let navigate = useNavigate();
  function submit(values, action) {
    let logedUser = {
      name: "",
      surname: "",
      email: values.email,
      password: values.password,
      favs: [],
      watchLater: [],
    };
    usersData &&
      usersData.forEach((elem) => {
        if (elem?.email == values.email) {
          console.log(elem.favs, elem.watchLater);
          logedUser.name = elem.name;
          logedUser.surname = elem.surname;
          logedUser.favs = elem.favs;
          logedUser.watchLater = elem.watchLater;
        }
      });

    let test = true;
    usersData.forEach((elem) => {
      if (
        elem.email == logedUser.email &&
        elem.password == logedUser.password
      ) {
        setIsLoginAlert(true);
        setTimeout(() => {
          setIsLoginAlert(false);
          navigate("/");
        }, 2000);
        test = false;
        localStorage.setItem("logedUser", JSON.stringify(logedUser));
      }
    });
    if (test) {
      setWrongEmailPass(true);
      setTimeout(() => {
        setWrongEmailPass(false);
      }, 2000);
    }
  }
  let { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submit,
  });
  return (
    <div className={loginCss.loginBody}>
      <div
        className={`${loginCss.alert_div} ${
          isLoginAlert ? loginCss.show_alert : loginCss.hide_alert
        }`}
      >
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          fontSize="20px"
        >
          Giriş başarılı. Hoşgeldiniz!
        </Alert>
      </div>
      <div
        className={`${loginCss.wrong_email_alert} ${
          wrongEmailPass ? loginCss.show_alert : loginCss.hide_alert
        }`}
      >
        <Alert severity="error">Email adresi ve ya şifre yanlış</Alert>
      </div>

      <div className={loginCss.container}>
        {" "}
        <div className={loginCss.home_link}>
          <Link to="/">Ana Sayfa</Link>
        </div>
        <h1>Tekrar Hoşgeldiniz!</h1>
        <form onSubmit={handleSubmit}>
          <div className={loginCss.formContainer}>
            <div className={loginCss.inputDiv}>
              <label>Email</label>
              <input
                type="text"
                id="email"
                placeholder="Email giriniz"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className={loginCss.inputDiv}>
              <label>Şifre</label>
              <input
                type={isVisibilityPassword ? "text" : "password"}
                id="password"
                placeholder="Şifrenizi giriniz"
                value={values.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={loginCss.visibility_icon}
                onClick={(e) => {
                  setisVisibilityPassword(!isVisibilityPassword);
                }}
              >
                {isVisibilityPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </button>
            </div>
            <div className={loginCss.error_message}>
              {/* <p>Email adresi ve ya sifre yalnis</p> */}
            </div>

            <div className={loginCss.form_links}>
              <Link>Şifreni mi unuttun?</Link>
              <div style={{ display: "flex", gap: "5px" }}>
                <p style={{ color: "white" }}>Kayıt değilmisin?</p>
                <Link to="/register">Kayıt ol</Link>
              </div>
            </div>
            <button type="submit" className={loginCss.login_btn}>
              Giriş yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
