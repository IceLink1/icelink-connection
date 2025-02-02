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
import { images } from "../../utils/getAvatars";
import Select from "../../components/select/Select";

export default function Profile() {
  const { isLoading } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const [name, setName] = useState(userData.fullName);
  const [bio, setBio] = useState(userData.bio);
  const [location, setLocation] = useState(userData.location);
  const [sex, setSex] = useState(userData.sex);
  const [birthday, setBirthday] = useState(userData.birthday);
  const [ava, setAva] = useState(userData.avatarUrl);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const data = [
    { value: "Not specified", label: "Not specified" },
    {
      value: "Famle",
      label: "Famle",
    },
    {
      value: "Man",
      label: "Man",
    },
  ];
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
      const data = {
        sex,
        bio,
        birthday,
        location,
        avatarUrl: ava,
        fullName: name,
        token: cookies.token,
      };
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
          <Button onClick={logoutHandler}>Cancel</Button>
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
          <Input value={name} setValue={setName} placeholder={"Name"} />
          <Input value={bio} setValue={setBio} placeholder={"Bio"} />
          <Input
            value={location}
            setValue={setLocation}
            placeholder={"Location"}
          />
          <Select setState={setSex} data={data} />
          <Input type="date" value={birthday} setValue={setBirthday} />
          <Button onClick={settingsHandler}>Cencel</Button>
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
          <p>Bio: {userData.bio}</p>
          <p>Location: {userData.location}</p>
          <p>Sex: {userData.sex}</p>
          <p>Birth-day: {userData.birthday}</p>
          <Button onClick={logoutHandler}>Logout</Button>
          <Button onClick={settingsHandler}>Settings</Button>
        </div>
      </div>
    </div>
  );
}
