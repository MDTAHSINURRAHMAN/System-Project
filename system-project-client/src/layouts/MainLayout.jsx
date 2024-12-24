import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/pets">Pets</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default MainLayout;
