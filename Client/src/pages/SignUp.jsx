import Form from "../components/Form";
import { useEffect, useState } from "react";
import { clearErrors } from "../states/authentication";
import { useDispatch, useSelector } from "react-redux";
import CustomError from "../components/CustomError";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Actions/authActions";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, error, success } = useSelector((state) => state.auth);

  const register = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, username }));
    if (success) navigate("/signin");
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
            placeholder="user name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
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
        </div>
        <button className="submit--form" onClick={register}>
          Register
        </button>
        {error && <CustomError err={error} />}
      </Form>
    </>
  );
};

export default SignUp;
