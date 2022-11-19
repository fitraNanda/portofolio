import Axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Verification = () => {
  const { token } = useParams();
  const navigate = useNavigate();

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
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    verif();
  }, []);

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
