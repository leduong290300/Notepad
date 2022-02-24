import LoginForm from "../Components/Login/LoginForm";
import RegisterForm from "../Components/Register/RegisterForm";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";

import classNames from "classnames";

const languages = [
  {
    code: "vi",
    name: "Vietnamese",
    country_code: "vi",
  },
  {
    code: "us",
    name: "English",
    country_code: "us",
  },
  {
    code: "kr",
    name: "Korea",
    country_code: "kr",
  },
];

const Home = ({ authRoute }) => {
  const currentLanguageCode = cookies.get("i18next") || "vi";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
  }, [currentLanguage, t]);

  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else if (isAuthenticated) return <Redirect to="/dashboard" />;
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <div className="landing-language">
            <DropdownButton
              variant="outline-secondary"
              title={t("chose")}
              id="input-group-dropdown-1"
              className="mb-3"
            >
              {languages.map(({ code, name, country_code }) => (
                <Dropdown.Item
                  key={code}
                  className={classNames("dropdown-item", {
                    disabled: currentLanguageCode === code,
                  })}
                  onClick={() => {
                    i18next.changeLanguage(code);
                  }}
                >
                  <span
                    className={`fi fi-${country_code} mx-2 fis`}
                    style={{
                      opacity: currentLanguageCode === code ? 0.5 : 1,
                    }}
                  ></span>
                  {name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
          <h1>Notepad</h1>
          <h4>{t("slogan")}</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Home;
