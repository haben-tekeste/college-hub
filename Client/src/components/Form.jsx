import { Link, useLocation } from "react-router-dom";
import "../styles/Auth.css";
const Form = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div className="container--auth">
      <div className="nav--auth">
        <Link
          className={`login--auth log--btn ${
            pathname == "/signin" ? "active--bar" : null
          }`}
          to={"/signin"}
        >
          LOGIN
        </Link>
        <Link
          className={`register--auth log--btn ${
            pathname == "/signup" ? "active--bar" : null
          }`}
          to={"/signup"}
        >
          REGISTER
        </Link>
      </div>

      {children}
    </div>
  );
};

export default Form;
