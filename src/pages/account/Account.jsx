import React from "react";
import accountCss from "./Account.module.css";
import { useNavigate } from "react-router-dom";

const Account = ({ logedUser }) => {
  let navigate = useNavigate();
  console.log(logedUser);
  return (
    <>
      {logedUser && logedUser ? (
        <>
          <div className={accountCss.account_container}>
            <div className={accountCss.account_image}>
              <img
                src="https://cdn.pixabay.com/photo/2013/07/12/18/38/avatar-153605_640.png"
                alt=""
              />
            </div>
            <div className={accountCss.details}>
              <h1>
                {logedUser.name} {logedUser.surname}
              </h1>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.setItem("logedUser", JSON.stringify(null));
              localStorage.setItem("favs", JSON.stringify(null));
              localStorage.setItem("watchLater", JSON.stringify(null));

              navigate("/");
            }}
          >
            Cikis yap
          </button>
        </>
      ) : (
        <>
          <div className={accountCss.no_account_container}>No account</div>
        </>
      )}
    </>
  );
};

export default Account;
