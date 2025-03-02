import { Component, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";

// pages
import Authentication from "./pages/Authentication";

class App extends Component {
  render(): ReactNode {
    return (
      <div className="w-screen h-screen overflow-hidden">
        <Routes>
          <Route element={<ProtectedPages />} path="/"></Route>
          <Route element={<Authentication />} path="/authentication"></Route>
        </Routes>
      </div>
    );
  }
}

// protected pages
class ProtectedPages extends Component {
  render() {
    return <div>Protected pages</div>;
  }
}

export default App;
