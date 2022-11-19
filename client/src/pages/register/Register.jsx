import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import Axios from "axios";
import { useState } from "react";
import { API_URL } from "../../constant/API";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    coverPic: "dummy-img.png",
    profilePic: "dummy-profile-pic-male1.jpg",
  });

  const [err, setErr] = useState(null);

  function handleInput(e) {
    let { name, value } = e.target;

    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await Axios.post(`${API_URL}/api/auth/register`, input);
    } catch (err) {
      setErr(err.response.data);
    }
    navigate("/login");
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              onChange={handleInput}
              type="text"
              placeholder="Username"
              name="username"
            />
            <input
              onChange={handleInput}
              type="text"
              placeholder="Email"
              name="email"
            />

            <input
              onChange={handleInput}
              type="password"
              placeholder="password"
              name="password"
            />

            <input
              onChange={handleInput}
              type="text"
              placeholder="Name"
              name="name"
            />
            <div>
              <button onClick={handleClick}>Register</button>

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

export default Register;
