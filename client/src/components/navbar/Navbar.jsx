import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { AuthContext } from "../../context/authContext";
import Axios from "axios";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const locationPath = "/";

  function logoutBtn() {
    localStorage.removeItem("user");
    Axios.post("http://localhost:8800/api/auth/logout", {})
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }

  const [profilePic, setProfilePic] = useState("");
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:8800/api/users/find/${currentUser.id}`)
      .then((res) => {
        setProfilePic(res.data.profilePic);
        setProfileName(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [profilePic]);

  return (
    <div className="navbar">
      <div className="left">
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onClick={() => window.locationPath.reload()}
        >
          <span>Lamasocial</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyIcon style={{ cursor: "pointer" }} onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={toggle}
          />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />

        <div class="dropdown">
          <div className="user">
            <img
              src={"http://localhost:8800/upload/" + profilePic}
              alt="image"
            />
            <span>{profileName}</span>
          </div>
          <div class="dropdown-content">
            <button onClick={logoutBtn}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
