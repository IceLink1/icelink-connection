import React, { useEffect } from "react";
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
          <img src={someUserData.avatarUrl} alt="" className="Users__avatar" />
          <div className="Users__data">
            <h2>Name: {someUserData.fullName}</h2>
            <h3>Email: {someUserData.email}</h3>
            <p>created: {someUserData.createdAt}</p>
            <Button>Follow</Button>
          </div>
        </div>
      )}
    </div>
  );
}
