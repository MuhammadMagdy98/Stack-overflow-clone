import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/SignUp";
import Questions from "./components/Questions/Questions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LoginContext} from "./helpers/Context";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/questions" element={<Questions/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
