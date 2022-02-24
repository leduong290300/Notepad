import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AlertMessage from "../../Components/AlertMessage/AlertMessage";
import { useTranslation } from "react-i18next";
const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);
  const { t } = useTranslation();
  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setAlert({
        type: "danger",
        message: ` ${t("login_fail_user_password")}`,
      });
      setTimeout(() => setAlert(null), 5000);
      return;
    }
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({
          type: "danger",

          message: loginData.message ? `${t("login_fail_user_password")}` : "",
        });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder={t("username")}
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder={t("password")}
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          {t("login")}
        </Button>
      </Form>
      <p>
        {t("dont_account")}
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            {t("register")}
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
