import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/login/login";
import Home from "./component/home/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

