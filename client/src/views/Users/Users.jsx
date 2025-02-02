import React, { useEffect, useState } from "react";
import "./Users.css";
import { useParams } from "react-router-dom";
import { getById } from "../../store/reducers/AuthReducers/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loading/Loader";
import Button from "../../components/Button/Button";

export default function Users() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { someUserData, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getById({ _id: id }));
  }, []);

  return (
    <div className="Users">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className="Users__content">
          <div className="Users__avatar">
            <img src={someUserData.avatarUrl} alt="" />
          </div>
          <div className="Users__data">
            <h2>Name: {someUserData.fullName}</h2>
            <h3>Email: {someUserData.email}</h3>
            <p>Created: {someUserData.createdAt}</p>
            <p>Bio: {someUserData.bio || "No bio available"}</p>
            <p>Location: {someUserData.location || "Earth"}</p>
            <p>Sex: {someUserData.sex || "No available"}</p>
            <p>Birth-day: {someUserData.birthday || "No available"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
