import Axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Verification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  function verif() {
    Axios.patch(
      `http://localhost:8800/api/auth/verified`,
      {},
      {
        headers: {
          Authorization: "bearer " + token,
        },
      }
    )
      .then((res) => {
        console.log(res);
        logout();
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    verif();
  });

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Loading...</h1>
    </div>
  );
};

export default Verification;
