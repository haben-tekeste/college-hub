import Form from "../components/Form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearErrors } from "../states/authentication";
import { useDispatch, useSelector } from "react-redux";
import CustomError from "../components/CustomError";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../Actions/authActions";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, error, success } = useSelector((state) => state.auth);

  const login = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
    if (success) navigate("/");
  };

  useEffect(() => {
    dispatch(clearErrors());
    if (userInfo) navigate("/");
  }, [userInfo, navigate, dispatch]);

  return (
    <>
      <Form>
        <div className="sign--up">
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            New to the platform? <Link to={"/signup"}>Register</Link>
          </div>
        </div>
        <button onClick={login} className="submit--form">
          Sign in
        </button>
        {error && <CustomError err={error} />}
      </Form>
    </>
  );
};

export default SignIn;
