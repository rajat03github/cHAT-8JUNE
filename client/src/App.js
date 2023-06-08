import "./App.css";
import { Route, Routes } from "react-router-dom";
// import Register from "./Pages/HOME/Register";
// import Login from "./Pages/HOME/Login";
import Chat from "./Pages/Chat";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import SetAvatar from "./Pages/SetAvatar";

function App() {
  return (
    // element={<Register />} add as Element not just {Register}
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Chat />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/setAvatar" element={<SetAvatar />} />
      </Routes>
    </div>
  );
}

export default App;
