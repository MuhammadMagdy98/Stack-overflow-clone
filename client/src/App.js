import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/SignUp";
import Questions from "./components/Questions/Questions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginContext } from "./helpers/Context";
import { TagContext } from "./helpers/Context";
import Ask from "./components/Ask/Ask";
import { useState } from "react";
import PrivateScreen from "./components/Routes/PrivateScreen";
import { Tags } from "./components/Tags/Tags";
import { AddTagForm } from "./components/AddTagForm/AddTagForm";
import QuestionView from "./components/QuestionView/QuestionView";
import Profile from "./components/Profile/Profile/Profile";
function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tags, setTags] = useState([]);


  return (
    <Router>
      <div className="App">
        <LoginContext.Provider
          value={{
            username,
            setUsername,
            isLoggedIn,
            setIsLoggedIn,
            isAdmin,
            setIsAdmin,
          
          }}
        >
          <TagContext.Provider value={{tags, setTags}}>
            <PrivateScreen />
            <Navbar />
            {/* <Profile about="heyhey"/> */}

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/ask" element={<Ask />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/add-tags" element={<AddTagForm />} />
              <Route path="/question/:id" element={<QuestionView  />} />
            </Routes>
          </TagContext.Provider>
        </LoginContext.Provider>
      </div>
    </Router>
  );
}

export default App;
