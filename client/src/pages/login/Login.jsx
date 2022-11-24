import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  function handleInput(e) {
    let { name, value } = e.target;

    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(input);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  console.log(currentUser);

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello friends</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              name="username"
              onChange={handleInput}
              type="text"
              placeholder="Username"
            />
            <input
              name="password"
              onChange={handleInput}
              type="password"
              placeholder="password"
            />
            <div>
              <button onClick={handleLogin}>Login</button>
              <span style={{ color: "red", marginLeft: "5px" }}>
                {err && err}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
