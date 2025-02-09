import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../store/reducers/PostReducers/PostActions";
import Comment from "../../components/Comment/Comment";
import Loader from "../../components/Loading/Loader";
import "./FullOpenPost.css";
import iceAxios from "../../axios";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useCookies } from "react-cookie";
import { createComments } from "../../store/reducers/CommentReducers/commentActions";
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function FullOpenPost() {
  const { id } = useParams();
  const [postComments, setPostComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const { openPost, isLoading } = useSelector((state) => state.post);
  const COMMENTS = useSelector((state) => state.comment);
  const { isAuth, userData } = useSelector((state) => state.auth);
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);

  const getComments = useCallback(async (data) => {
    try {
      const respone = await iceAxios.get(`/comment/${data.id}`);
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const data = { id };
    dispatch(getById(data));
    getComments(data).then((res) => setPostComments(res));
  }, []);

  if (!openPost._id) {
    return (
      <div className="FullOpenPost">
        <Loader />
      </div>
    );
  }

  const addComment = () => {
    if (commentText.trim().length > 3) {
      setCommentText("");
      const data = {
        id,
        text: commentText,
        token: cookies.token,
      };
      dispatch(createComments(data)).then(() => {
        getComments(data).then((res) => setPostComments(res));
      });
    } else {
      alert("Comment length must be longer than 3 characters");
    }
  };

  return (
    <div className="FullOpenPost">
      {isLoading || COMMENTS.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="FullOpenPost__data">
            <Link to={`/users/${openPost.user?._id}`}>
              <img
                className="FullOpenPost__avatar"
                src={openPost.user.avatarUrl}
                alt=""
              />
            </Link>
            <div className="FullOpenPost__content">
              <div>
                <p>{openPost.user.fullName}</p>
                <p>{openPost.createdAt}</p>
              </div>
              <img
                className="FullOpenPost__preview"
                src={openPost.imageUrl}
                alt=""
              />
              <h1>{openPost.title}</h1>
              <p>
                {openPost.tags.map((e, i) => (
                  <span key={i}>#{e}</span>
                ))}
              </p>
              <Markdown>{openPost.text}</Markdown>
              <div className="FullOpenPost__metadata">
                <div>
                  {openPost.viewsCount} <VisibilityIcon />
                </div>
                <div>
                  {openPost.commentCount} <InsertCommentIcon />
                </div>
              </div>
            </div>
            {openPost._id && openPost.user._id == userData._id && (
              <Link to={`/edit/${openPost._id}`}><BorderColorIcon fontSize="large"/> Edit</Link>
            )}
          </div>
          <div className="FullOpenPost__comment">
            <h1>Comments</h1>
            {postComments.map((e, i) => (
              <Comment
                key={e._id}
                avatarUrl={e.user.avatarUrl}
                userId={e.user._id}
                fullName={e.user.fullName}
                text={e.text}
              />
            ))}
            {isAuth ? (
              <div className="FullOpenPost__comment__form">
                <Input
                  setValue={setCommentText}
                  value={commentText}
                  placeholder={"Comment ..."}
                />
                <Button onClick={addComment}>Send</Button>
              </div>
            ) : (
              <div className="FullOpenPost__comment__form">
                <h3>
                  <Link to="/signup">Register to leave comments</Link>
                </h3>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
