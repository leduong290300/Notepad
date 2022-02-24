import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AlertMessage from "../../Components/AlertMessage/AlertMessage";
import { useTranslation } from "react-i18next";
const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);
  const { t } = useTranslation();
  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setAlert({ type: "danger", message: ` ${t("fail_user_password")}` });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: ` ${t("match_password")}` });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({
          type: "danger",
          message: registerData.message ? `${t("register_fail_user")}` : "",
        });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder={t("username")}
            name="username"
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder={t("password")}
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder={t("confirm_password")}
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          {t("register")}
        </Button>
      </Form>
      <p>
        {t("have_a_account")}
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            {t("login")}
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
