import { Link } from "react-router-dom";

const Header = () => {
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
        <span>logout</span>
      </div>
    </div>
  );
};

export default Header;
