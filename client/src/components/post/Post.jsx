import "./post.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Comments from "../comments/Comments";
import TextsmsIcon from "@mui/icons-material/Textsms";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Axios from "axios";
import { useEffect } from "react";

const Post = (props) => {
  const [openComent, setOpenComment] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", props.posts.id], () =>
    makeRequest.get("/likes?postId=" + props.posts.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + props.posts.id);
      return makeRequest.post("/likes", { postId: props.posts.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  function handleLike() {
    mutation.mutate(data.includes(currentUser.id));
  }

  const locationPath = `/profile/${props.posts.userId}`;

  const [commentData, setCommentData] = useState([]);

  function getData(data) {
    setCommentData(data);
  }

  function getCommentCount() {
    Axios.get("http://localhost:8800/api/comments?postId=" + props.posts.id)
      .then((res) => {
        setCommentData(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCommentCount();
  }, [commentData]);

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.post("/posts/" + postId, {
        image: props.posts.img,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([]);
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(props.posts.id);
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={"http://localhost:8800/upload/" + props.posts.profilePic}
              alt=""
            />

            <div className="details">
              <Link
                onClick={() => window.locationPath.reload()}
                style={{ textDecoration: "none", color: "inherit" }}
                to={locationPath}
              >
                <span className="name">{props.posts.name}</span>
              </Link>
              <span className="date">
                {moment(props.posts.createdAt).fromNow()}
              </span>
            </div>
          </div>
          {menuOpen ? (
            <div className="option">
              <MoreHorizIcon
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ cursor: "pointer" }}
              />
              <button className="delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          ) : (
            <MoreHorizIcon
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
        <div className="content">
          <p>{props.posts.desc}</p>

          <img src={"http://localhost:8800/upload/" + props.posts.img} alt="" />
        </div>
        <div className="info">
          <div className="item" style={{ cursor: "pointer" }}>
            {isLoading ? (
              <>
                <FavoriteIcon onClick={handleLike} />
                <FavoriteBorderIcon onClick={handleLike} />
              </>
            ) : data.includes(currentUser.id) ? (
              <FavoriteIcon onClick={handleLike} style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon onClick={handleLike} />
            )}
            {isLoading ? 0 : data.length} Likes
          </div>
          <div
            className="item"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpenComment(!openComent);
            }}
          >
            {openComent ? (
              <>
                <TextsmsIcon />
                {commentData.length}
              </>
            ) : (
              <>
                <TextsmsOutlinedIcon />
                {commentData.length}
              </>
            )}
          </div>
          <div className="item" style={{ cursor: "pointer" }}>
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {openComent ? (
          <Comments postId={props.posts.id} onSubmit={getData} />
        ) : null}
      </div>
    </div>
  );
};

export default Post;
