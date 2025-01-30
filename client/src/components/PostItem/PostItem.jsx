import React from "react";
import "./PostItem.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

export default function PostItem({
  commentCount,
  viewsCount,
  avatar,
  author,
  image,
  title,
  text,
  tags = ["news"],
}) {
  return (
    <div className="PostItem">
      {image && (
          <img
            loading="lazy"
            src={image}
            alt="Preview"
            className="PostItem__preview"
          />
      )}
      <div className="PostItem_content">
        <img src={avatar} alt="avatar" className="PostItem_avatar" />
        <div className="PostItem_data">
          <h5>{author}</h5>
          <h1>{title}</h1>
          <p>
            {tags.map((e, i) => (
              <span key={i}>#{e}</span>
            ))}
          </p>
          <p className="text">{text}</p>
          <h4 className="PostItem__metadata__conteiner">
            <div className="PostItem__metadata">
              {viewsCount} <VisibilityIcon />
            </div>
            <div className="PostItem__metadata">
              {commentCount} <InsertCommentIcon />
            </div>
          </h4>
        </div>
      </div>
    </div>
  );
}
