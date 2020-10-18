import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import TablePage from "../src/pages/TablePage";
import Home from "../src/pages/Home";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Route exact path="/" component={Home} />
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
