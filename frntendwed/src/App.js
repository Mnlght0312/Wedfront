import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Team from "./components/Team";
import Support from "./components/Support";
import Donation from "./components/Donation";
import Contact from "./components/Contact";
import About from "./components/About";
import Products from "./components/Products";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Navbar />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/support" element={<Support />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
