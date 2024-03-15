import { FC } from "react";
import "./App.css";
import 'react-notifications/lib/notifications.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {NotificationContainer} from 'react-notifications';
const App: FC = () => {
  return (
    <div>
      <NotificationContainer/>
      <Router>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
