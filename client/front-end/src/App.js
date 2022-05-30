import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import QuestionCard from "./components/QuestionCard";
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
          <Route path="/questions" element={<QuestionCard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
