import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/"; // or redirect to login page
  };
  return (
    <div className="d-flex justify-content-between ">
      <div>logo</div>
      <div className="d-flex gap-2">
        <Link to={"/"}>
          <span>Home</span>
        </Link>
        <Link to={"/favourite"}>
          <span>favourite</span>
        </Link>
        <span>user</span>
        {token ? (
          <span onClick={handleLogout} style={{ cursor: "pointer" }}>
            logout
          </span>
        ) : (
          <span
            onClick={() => (window.location.href = "/login")}
            style={{ cursor: "pointer" }}
          >
            Login
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
