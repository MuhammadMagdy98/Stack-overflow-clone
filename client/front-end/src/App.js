import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/SignUp";
import Questions from "./components/Questions/Questions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginContext } from "./helpers/Context";
import Ask from "./components/Ask/Ask";
import { useState } from "react";
function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div className="App">
      <LoginContext.Provider
            value={{ username, setUsername, isLoggedIn, setIsLoggedIn }}
          >
        <Navbar />
        <Routes>
          
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/ask" element={<Ask />} />
        </Routes>
        </LoginContext.Provider>
      </div>
    </Router>
  );
}

export default App;
