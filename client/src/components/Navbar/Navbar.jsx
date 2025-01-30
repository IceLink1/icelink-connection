import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { getData } from "../../utils/getNavbarData";

export default function Navbar() {
  const { isAuth, userData } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData(isAuth));
  }, [isAuth]);
  const [active, setActive] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const OpenBar = () => {
    setActive(true);
  };
  const CloseBar = () => {
    setActive(false);
  };

  return (
    <nav ref={ref}>
      <ul
        className={`sidebar content_navbar ${
          active ? " displayFlex" : " DisplayNone"
        } 
         ${inView && "active"}`}
      >
        <li onClick={CloseBar}>
          <Link>X</Link>
        </li>
        {data.map((e, i) => (
          <li
            key={i}
            onClick={CloseBar}
            className={e.classMobile && e.classMobile}
          >
            <Link to={e.path}>{e.title}</Link>
          </li>
        ))}
        {userData.role === "admin" && (
          <li onClick={CloseBar}>
            <Link to="/admin">Admin Panel</Link>
          </li>
        )}
      </ul>
      <ul
        className={`content_navbar 
           ${inView && " active"}`}
      >
        {data.map((e, i) => (
          <li className={e.class} key={i}>
            <Link to={e.path}>{e.title}</Link>
          </li>
        ))}
        {userData.role === "admin" && (
          <li className="hideOnMobile">
            <Link to="/admin">Admin Panel</Link>
          </li>
        )}
        <li className="menu-button" onClick={OpenBar}>
          <Link>menu</Link>
        </li>
      </ul>
    </nav>
  );
}
