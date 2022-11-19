import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Axios from "axios";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const locationPath = `/profile/${currentUser.id}`;

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
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <Link
            onClick={() => window.locationPath.reload()}
            to={`/profile/${currentUser.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="user">
              <img
                src={"http://localhost:8800/upload/" + profilePic}
                alt="image"
              />
              <span>{profileName}</span>
            </div>
          </Link>
          <div className="item">
            <img src={Friends} />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} />
            <span>Market</span>
          </div>
          <div className="item">
            <img src={Watch} />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your Shortcut</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeftBar;
