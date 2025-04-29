import React, { useEffect, useState } from "react";
import registerCss from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";
import { RegisterFromSchema } from "../../components/FormikSchemas/FormikSchemas";
import axios from "axios";
import { Alert } from "@mui/material";
const Register = () => {
  const usersURL = "https://669f8faab132e2c136fe57d0.mockapi.io/users";
  const [usersData, setUsersData] = useState([]);
  const [isRegisterAlert, setIsRegisterAlert] = useState(false);
  const [wrongEmailAlert, setWrongEmailAlert] = useState(false);
  useEffect(() => {
    axios(usersURL).then((res) => {
      setUsersData(res.data);
    });
  }, []);
  let navigate = useNavigate();
  function submit(values, action) {
    let newUser = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
      favs: [],
      watchLater: [],
    };

    if (!usersData.find((elem) => elem.email == newUser.email)) {
      axios({
        method: "post",
        url: usersURL,
        data: newUser,
      });
      setIsRegisterAlert(true);
      action.resetForm();
      setTimeout(() => {
        setIsRegisterAlert(false);
        navigate("/login");
        window.location.reload();
      }, 2000);
    } else {
      setWrongEmailAlert(true);
      setTimeout(() => {
        setWrongEmailAlert(false);
      }, 2000);
    }
  }
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      term: "",
    },
    validationSchema: RegisterFromSchema,
    onSubmit: submit,
  });
  const [isVisibilityPassword, setisVisibilityPassword] = useState(false);
  const [isVisibilityConfirmPassword, setisVisibilityConfirmPassword] =
    useState(false);
  return (
    <div className={registerCss.registerBody}>
      <div
        className={`${registerCss.alert_div} ${
          isRegisterAlert ? registerCss.show_alert : registerCss.hide_alert
        }`}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Kayıt oldunuz
        </Alert>
      </div>
      <div
        className={`${registerCss.wrong_email_alert} ${
          wrongEmailAlert ? registerCss.show_alert : registerCss.hide_alert
        }`}
      >
        <Alert severity="error">Bu email adresi kayıtlı</Alert>
      </div>

      <div className={registerCss.left_background}></div>
      <div className={registerCss.right_background}></div>

      <form onSubmit={handleSubmit}>
        <div className={registerCss.container}>
          {" "}
          <div className={registerCss.home_link}>
            <Link to="/">Ana Sayfa</Link>
          </div>
          <h1>Hoşgeldiniz!</h1>
          <div className={registerCss.form_container}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className={registerCss.inputDiv}>
                <label>Ad</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Adınızı giriniz"
                  value={values.name}
                  onChange={handleChange}
                />
                <div className={registerCss.error_message}>
                  {errors.name && <p>{errors.name}</p>}
                </div>
              </div>
              <div className={registerCss.inputDiv}>
                <label>Soyad</label>
                <input
                  type="text"
                  id="surname"
                  placeholder="Soyadınızı giriniz"
                  value={values.surname}
                  onChange={handleChange}
                />
                <div className={registerCss.error_message}>
                  {errors.surname && <p>{errors.surname}</p>}
                </div>
              </div>
            </div>

            <div className={registerCss.inputDiv}>
              <label>Email</label>
              <input
                type="text"
                id="email"
                placeholder="Email giriniz"
                value={values.email}
                onChange={handleChange}
              />
              <div className={registerCss.error_message}>
                {errors.email && <p>{errors.email}</p>}
              </div>
            </div>
            <div className={registerCss.inputDiv}>
              <label>Şifre</label>
              <input
                type={isVisibilityPassword ? "text" : "password"}
                id="password"
                placeholder="Şifre giriniz"
                value={values.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={registerCss.visibility_icon}
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
              <div className={registerCss.error_message}>
                {errors.password && <p>{errors.password}</p>}
              </div>
            </div>
            <div className={registerCss.inputDiv}>
              <label>Şifre Tekrarı</label>
              <input
                type={isVisibilityConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Şifrenizi tekrar giriniz"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className={registerCss.visibility_icon}
                onClick={(e) => {
                  setisVisibilityConfirmPassword(!isVisibilityConfirmPassword);
                }}
              >
                {isVisibilityConfirmPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </button>

              <div className={registerCss.error_message}>
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
              </div>
            </div>
            <div className={registerCss.form_footer}>
              <div className={registerCss.inputDiv}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    id="term"
                    style={{ width: "18px" }}
                    value={values.term}
                    onChange={handleChange}
                  />
                  <label>Kullanıcı şartlarını kabul ediyorum</label>
                </div>

                <div className={registerCss.error_message}>
                  {errors.term && <p>{errors.term}</p>}
                </div>
              </div>{" "}
              <div className={registerCss.form_links}>
                <div style={{ display: "flex", gap: "5px" }}>
                  <p style={{ color: "white" }}>Hesabın var mı?</p>
                  <Link to="/login">Giriş yap</Link>
                </div>
              </div>
            </div>
            <button type="submit" className={registerCss.register_btn}>
              Kayıt ol
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
