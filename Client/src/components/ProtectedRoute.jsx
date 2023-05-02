import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import Loading from "./Loading";

const ProtectedRoute = () => {
  const { userInfo, loading } = useSelector((state) => state.auth);
  if (loading) return <Loading />;
  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div
        className="unauthorized"
        style={{
          height: "90vh",
          width: "80vw",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to="/signin">Login</NavLink> to gain access
        </span>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
