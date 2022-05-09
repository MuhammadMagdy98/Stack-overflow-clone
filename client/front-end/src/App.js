import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Singup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Navbar />

          <Route  path="/" element={<Navbar />}>
            
          </Route>
          <Route exact path="/Singup" element={<Signup/>}>
            <Signup />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
