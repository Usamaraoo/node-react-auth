import { FC } from "react";
import "./App.css";
import "react-notifications/lib/notifications.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { NotificationContainer } from "react-notifications";
import PrivateRoutes from "./utils/PrivateRoute";
import Navbar from "./Layouts/Navbar";
import PublicRoute from "./utils/PublicRoute";
import { Profile } from "./pages/Profile";
const App: FC = () => {
  return (
    <div>
      <NotificationContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
