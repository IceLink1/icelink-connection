import React, { useState } from "react";
import "./Profile.css";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import { useCookies } from "react-cookie";
import { logout } from "../../store/reducers/AuthReducers/AuthReduser";
import Loader from "../../components/Loading/Loader";
import { update } from "../../store/reducers/AuthReducers/AuthActions";

export default function Profile() {
  const images = [
    "https://i.pinimg.com/736x/8d/26/33/8d2633a83eced507b5b1159f327d42ca.jpg",
    "https://i.pinimg.com/736x/93/f7/dd/93f7dd7abfddc6cbaa220a0a0b7ca19b.jpg",
    "https://i.pinimg.com/736x/11/e4/d1/11e4d13ee2515299cae319c88a8f588e.jpg",
    "https://i.pinimg.com/736x/30/b7/64/30b7641b391c5d3e9a4ae4b47e155358.jpg",
    "https://i.pinimg.com/736x/65/a9/d8/65a9d87222a2e2389880619d799ace16.jpg",
    "https://i.pinimg.com/736x/1e/f5/9f/1ef59fa6143683471e2033955bcd66c8.jpg",
    "https://i.pinimg.com/736x/81/d6/38/81d638019523f17c7566fdea3eb724fa.jpg",
    "https://i.pinimg.com/736x/fa/82/51/fa8251fbb647576a535bf3869023e9a9.jpg",
    "https://i.pinimg.com/736x/fa/e5/c8/fae5c83282c1b10788f9f08c36e37b58.jpg",
    "https://i.pinimg.com/736x/02/72/3a/02723a455bced2c7e8181f3818cf897d.jpg",
    "https://i.pinimg.com/736x/9a/bf/2b/9abf2badc17a604853b39af68e20eb72.jpg",
    "https://i.pinimg.com/474x/d3/94/22/d39422c995e78d076d556813781ead0c.jpg",
   
  ];
  const { isLoading } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const [name, setName] = useState(userData.fullName);
  const [ava, setAva] = useState(userData.avatarUrl);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    setIsOpen(!isOpen);
  };
  const settingsHandler = () => {
    setIsOpenSettings(!isOpenSettings);
  };
  const Logout = () => {
    dispatch(logout());
    removeCookie("token");
    logoutHandler();
  };
  const Update = () => {
    if (name.trim() !== "") {
      const data = { avatarUrl: ava, fullName: name, token: cookies.token };
      dispatch(update(data));
      settingsHandler();
    }
  };
  const changeAvatarHandler = () => {
    setIsOpenAvatar(!isOpenAvatar);
  };
  const changeAva = (e) => {
    setAva(e);

    setIsOpenAvatar(!isOpenAvatar);
  };
  return (
    <div className="Profile">
      {isLoading && <Loader />}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="Profile__logout__panel">
          <h3>Are you sure you want to go out?</h3>
          <Button onClick={logoutHandler}>
            Cancel
          </Button>
          <Button onClick={Logout}>Logout</Button>
        </div>
      </Modal>

      <Modal isOpen={isOpenSettings} setIsOpen={setIsOpenSettings}>
        <div className="Profile__settings__panel">
          <h3>Click on avatar to change</h3>
          <img
            onClick={changeAvatarHandler}
            className="Profile__avatar"
            src={ava}
            alt=""
          />
          <Input value={name} setValue={setName} />
          <Button onClick={settingsHandler}>
            Cencel
          </Button>
          <Button onClick={Update}>Update</Button>
        </div>
      </Modal>

      <Modal isOpen={isOpenAvatar} setIsOpen={setIsOpenAvatar}>
          <div className="Profile__avatar__panel">
            {images.map((e, i) => (
              <img onClick={() => changeAva(e)} key={i} src={e} alt="" />
            ))}
          </div>
      </Modal>

      <div className="Profile__user__data">
        <img className="Profile__avatar" src={userData.avatarUrl} alt="" />
        <div>
          <h4>Name : {userData.fullName}</h4>
          <h4>Email : {userData.email}</h4>
          <p>Created at : {userData.createdAt}</p>
          <Button onClick={logoutHandler}>Logout</Button>
          <Button onClick={settingsHandler}>Settings</Button>
        </div>
      </div>
    </div>
  );
}
