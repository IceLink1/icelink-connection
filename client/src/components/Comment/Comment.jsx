import React from "react";
import "./Comment.css";
import { Link } from "react-router-dom";

export default function Comment({userId, avatarUrl, fullName,text }) {
  return (
    <div className="Comment">
      <Link to={`/users/${userId}`}>
      <img className="Comment__avatar" src={avatarUrl} alt="" />
      </Link>
      <div className="Comment__content">
        <p>{fullName}</p>
        <p className="Comment__comment">{text}</p>
      </div>
    </div>
  );
}
