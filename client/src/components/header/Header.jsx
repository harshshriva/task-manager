import "./header.scss";
import "../../styles/components/_button.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutSuccess } from "../../redux/authSlice";
import history from "../../history";

const Header = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { auth } = useSelector((state) => ({ ...state }));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logoutSuccess());
    localStorage.removeItem("auth");
    history.push("/signin");
    window.location.reload();
  };
  return (
    <div>
      <nav className="header">
        <div className="header__logo">
          <h5>Task Manager</h5>
        </div>
        <div className="header__search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/* You can add search functionality here */}
          <button className="search-button">Search</button>
        </div>
        <div className="header__buttons">
          {auth.currentUser && auth.currentUser.token ? (
            <Link to="/signin" className="button" onClick={handleClick}>
              SignOut
            </Link>
          ) : (
            <>
              <Link to="/signin" className="button">
                SignIn
              </Link>
              <Link to="/signup" className="button">
                SignUp
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
