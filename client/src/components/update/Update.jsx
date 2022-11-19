import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: "",
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  function handleInput(e) {
    setTexts((prev) => {
      const { name, value } = e.target;
      return { ...prev, [name]: value };
    });
  }

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  function deleteCoverOrProfile(image) {
    Axios.post("http://localhost:8800/api/delete", {
      image,
    })
      .then((res) => {})
      .catch((err) => console.log(err));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl = user.coverPic;
    let profileUrl = user.profilePic;

    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    setOpenUpdate(false);
    window.location.reload();
    if (cover) {
      deleteCoverOrProfile(user.coverPic);
    }
    if (profile) {
      deleteCoverOrProfile(user.profilePic);
    }
    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
  };

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  useEffect(() => {
    Axios.get(`http://localhost:8800/api/users/find/${userId}`)
      .then((res) => {
        setTexts((prev) => {
          return {
            ...prev,
            name: res.data.name,
            city: res.data.city,
            website: res.data.website,
          };
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="update">
      <div className="top">
        <h3>Update Page</h3>

        <span>
          <button onClick={() => setOpenUpdate(false)}>X</button>
        </span>
      </div>

      <form>
        <label htmlFor="cover">Cover Picture: </label>
        <input
          className="coverPic"
          type="file"
          id="cover"
          onChange={(e) => setCover(e.target.files[0])}
        />
        <label htmlFor="profile">Profile Picture: </label>
        <input
          className="profilePic"
          type="file"
          id="profile"
          onChange={(e) => setProfile(e.target.files[0])}
        />
        <input
          value={texts.name}
          type="text"
          name="name"
          onChange={handleInput}
          placeholder="Name"
        />
        <input
          value={texts.city}
          placeholder="City"
          type="text"
          name="city"
          onChange={handleInput}
        />
        <input
          placeholder="Website"
          value={texts.website}
          type="text"
          name="website"
          onChange={handleInput}
        />
        <button onClick={handleClick}>Update</button>
      </form>
    </div>
  );
};

export default Update;
