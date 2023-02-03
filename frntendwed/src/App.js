import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Team from "./Team";
import Support from "./Support";
import Donation from "./Donation";
import Contact from "./Contact";
import About from "./About";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/team" component={Team} />
        <Route path="/support" component={Support} />
        <Route path="/donation" component={Donation} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
