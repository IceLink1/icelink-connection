import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../views/Home/Home";
import Posts from "../views/Posts/Posts";
import FullOpenPost from "../views/Posts/FullOpenPost";
import Login from "../views/Login/Login";
import SignIn from "../views/SignIn/SignIn";
import Profile from "../views/Profile/Profile";
import { useSelector } from "react-redux";
import Admin from "../views/Admin/Admin";
import Users from "../views/Users/Users";

export default function MainRouter() {
  const { isAuth, userData } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<FullOpenPost />} />
      <Route path="/users/:id" element={<Users />} />
      {isAuth ? (
        <>
          {userData.role === "admin" && (
            <Route path="/admin" element={<Admin />} />
          )}
          <Route path="/profile" element={<Profile />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignIn />} />
        </>
      )}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
