import "./comments.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";

const Comments = (props) => {
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);

  let obj = props.postId;

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + obj).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        //invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const [commentDataChild, setCommentDataChild] = useState([]);

  function getCommentData() {
    Axios.get("http://localhost:8800/api/comments?postId=" + obj)
      .then((res) => {
        // setCommentCount(res.data.length);
        setCommentDataChild(res.data);
        props.onSubmit(res.data);
      })
      .catch((err) => console.log(err));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId: obj });
    getCommentData();
    setDesc("");
  };

  useEffect(() => {
    getCommentData();
  }, [commentDataChild]);

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
    <div className="comments">
      <div className="write">
        <img src={"http://localhost:8800/upload/" + profilePic} alt="" />

        <input
          value={desc}
          type="text"
          placeholder="write a comment.."
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? "loading..."
        : commentDataChild.map((val) => {
            return (
              <div className="comment">
                <img
                  src={"http://localhost:8800/upload/" + val.profilePic}
                  alt=""
                />
                <div className="info">
                  <span>{val.name}</span>
                  <p>{val.desc}</p>
                </div>
                <span className="date">{moment(val.createdAt).fromNow()}</span>
              </div>
            );
          })}
    </div>
  );
};

export default Comments;
