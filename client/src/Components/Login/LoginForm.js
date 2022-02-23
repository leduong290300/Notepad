import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AlertMessage from "../../Components/AlertMessage/AlertMessage";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

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

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
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
            placeholder="Tên đăng nhập"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Mật khẩu"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Đăng nhập
        </Button>
      </Form>
      <p>
        Chưa có tài khoản?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Đăng ký ngay
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;