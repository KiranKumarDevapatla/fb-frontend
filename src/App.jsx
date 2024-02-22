import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Connect from "./pages/Connect";
import Dashboard from "./pages/Dashboard";
import Conversation from "./pages/Conversation";
import { useContext, useEffect } from "react";
import { AppContext } from ".";

function App() {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) {
      dispatch({ type: "UPDATE_USER_SESSION", payload: session });
      navigate("/connect");
    } else navigate("/login");
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/conversations" element={<Conversation />} />
      </Routes>
    </div>
  );
}

export default App;
