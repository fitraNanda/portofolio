import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useEffect } from "react";
import Axios from "axios";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  /////////////////
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  ////////////////

  const [profileData, setProfileData] = useState({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:8800/api/users/find/" + userId)
      .then((res) => {
        setProfileData(res.data);
        setNotFound(false);
      })
      .catch((err) => {
        setNotFound(true);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (notFound) {
    return (
      <div style={{ backgroundColor: "red" }}>
        <h1 style={{ textAlign: "center" }}>NOT FOUND !</h1>
      </div>
    );
  } else {
    return (
      <div className="profile">
        <>
          <div className="images">
            <img
              className="cover"
              src={"http://localhost:8800/upload/" + profileData.coverPic}
              alt=""
            />
            <img
              className="profilePic"
              src={"http://localhost:8800/upload/" + profileData.profilePic}
              alt=""
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="hhtp://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="hhtp://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="hhtp://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="hhtp://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="hhtp://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{profileData.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{profileData.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{profileData.website}</span>
                  </div>
                </div>
                {currentUser.id === userId ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {rIsLoading
                      ? "Loading..."
                      : relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
          </div>
          <Posts className="posts" userId={userId} />
        </>
        {openUpdate && (
          <Update setOpenUpdate={setOpenUpdate} user={profileData} />
        )}
      </div>
    );
  }
};

export default Profile;
