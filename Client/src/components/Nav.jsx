import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetDetailsQuery } from "../Services/authService";
import { setCredentials } from "../states/authentication";

// react router
import { Link, useLocation } from "react-router-dom";

import ProfileComponent from "./ProfileComponent";
// react icons
import { AiOutlineBook, AiOutlineQuestion } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { TfiWrite } from "react-icons/tfi";
import { AiOutlineProject } from "react-icons/ai";

// styled components
import { StyledNav } from "../styles/NavStyles";

//
import { useSelector } from "react-redux";
import { signOut } from "../Actions/authActions";

const Nav = () => {
  const location = useLocation().pathname;
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetDetailsQuery("userDetails");

  useEffect(() => {
    if (data) dispatch(setCredentials(data?.currentUser));
  }, [data, dispatch]);

  return (
    <StyledNav className="flex-col">
      <h1>
        Student <span>Hub</span>
      </h1>
      <ul className="flex-col">
        <h2>General</h2>
        <Link className={location === "/" ? "active link" : "link"} to={"/"}>
          <GoHome /> My Profile
        </Link>
        <Link
          className={location === "/questions" ? "active link" : "link"}
          to={"/questions"}
        >
          <AiOutlineQuestion /> Questions{" "}
        </Link>
        <Link
          className={location === "/projects" ? "active link" : "link"}
          to={"/projects"}
        >
          <AiOutlineProject /> Projects{" "}
        </Link>

        <Link
          className={location === "/books" ? "active link" : "link"}
          to={"/books"}
        >
          <AiOutlineBook /> Books{" "}
        </Link>
        <Link
          className={location === "/blogs" ? "active link" : "link"}
          to={"/blogs"}
        >
          <TfiWrite /> Blogs
        </Link>
        {userInfo && (
          <>
            <h2>Settings</h2>
            <Link
              className={location === "/profile" ? "link active" : "link"}
              to={"/profile"}
            >
              <ProfileComponent name={userInfo.username} />
            </Link>
            <button
              className="flex tag-btn"
              onClick={() => {
                dispatch(signOut());
              }}
            >
              <FiLogOut /> Log Out
            </button>
          </>
        )}
      </ul>
    </StyledNav>
  );
};

export default Nav;
