import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import TravelPage from "./pages/TravelPage";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/travel" component={TravelPage} />
      <Route exact path="/contact" component={ContactPage} />
      <Route exact path="/" component={Home} />
      <Footer />
    </Router>
  );
}

export default App;
