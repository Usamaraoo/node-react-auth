import { FC } from "react";
import { Link } from "react-router-dom";
const Home: FC = () => {
  return (<div>
    <Link to={'/login'}>Login</Link>
  </div>);
};

export default Home;
