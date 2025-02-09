import Textarea from "../../../components/Textarea/Textarea";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loading/Loader";
import Button from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/Input/Input";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./Edit.css";
import {
  getById,
  updatePost,
} from "../../../store/reducers/PostReducers/PostActions";

export default function EditPost() {
  const { openPost, isLoading } = useSelector((state) => state.post);
  const Auth = useSelector((state) => state.auth);
  const [title, setTitle] = useState(openPost.title);
  const [imageUrl, setImageUrl] = useState(openPost.imageUrl);
  const [text, setText] = useState(openPost.text);
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState(openPost.tags);
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useNavigate();

  useEffect(() => {
    const data = { id };
    dispatch(getById(data));
  }, []);

  const addTag = (e) => {
    e.preventDefault();
    if (tagValue.trim()) {
      setTags([...tags, tagValue]);
      setTagValue("");
    }
  };

  const Save = (e) => {
    e.preventDefault();
    if (title.trim() && text.trim()) {
      const AllTags = tags.join(" ");
      const data = {
        imageUrl,
        title,
        text,
        _id: openPost._id,
        tags: AllTags,
        token: cookies.token,
      };
      try {
        dispatch(updatePost(data)).then((res) => {
          router("/posts");
        });
      } catch (error) {
        alert(error);
      }
      setTitle("");
      setText("");
      setTags([]);
      setImageUrl("");
    }
  };

  return (
    <div className="EditPost">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="PostData">
          <form className="PostData__form">
            <div>
              <h1>Edit Post</h1>
            </div>
            <div>
              <h3>Image:</h3>
              <Input
                type="text"
                setValue={setImageUrl}
                value={imageUrl}
                placeholder={"Enter post Image Url..."}
              />
            </div>
            <div>
              <h3>title:</h3>
              <Input
                type="text"
                setValue={setTitle}
                value={title}
                placeholder={"Enter post title..."}
              />
            </div>
            <div>
              <h3>text:</h3>
              <Textarea
                placeholder="Enter post description..."
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </div>
            <div>
              <h3>
                Tags:
                {tags.map((e, i) => (
                  <span className="PostData__tagItem" key={i}>
                    {" "}
                    #{e}
                  </span>
                ))}
              </h3>
              <Input
                type="text"
                setValue={setTagValue}
                value={tagValue}
                placeholder={"Enter post tags..."}
              />
              <Button onClick={addTag}>Add tag</Button>
            </div>
            <div>
              <Button onClick={Save}>Save</Button>
            </div>
          </form>
        </div>
      )}
      <div className="PostData__preview">
        <img
          className="PostData__preview__image"
          src={
            imageUrl ||
            "https://static-00.iconduck.com/assets.00/add-image-icon-2048x1908-0v5fxcb2.png"
          }
          alt=""
        />
      </div>
    </div>
  );
}
