import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Axios from "axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        //invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    // window.location.reload();
    let imgUrl = "";
    if (file) imgUrl = await upload();

    mutation.mutate({ desc, img: imgUrl });

    setDesc("");
    setFile(null);
  };

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
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"http://localhost:8800/upload/" + profilePic} alt="" />
            <input
              value={desc}
              type="text"
              placeholder={`What's on your mind ${profileName}?`}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="right">
            {file && (
              <img
                className="file"
                src={URL.createObjectURL(file)}
                alt="image"
              />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
