import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./side-nav.css";

const SideNav = () => {
  return (
    <nav className="sidebar">
      <br />
      <br />
      <br />
      <ul>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faHome} className="icon" /> Home
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faUser} className="icon" /> My Post
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faThumbsUp} className="icon" /> Liked
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
