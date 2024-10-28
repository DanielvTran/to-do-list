// Entry file for react application

// Required imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Used for handling routing both static and dynamic

// Hooks
import { useAuthContext } from "./hooks/useAuthContext";

// Pages and Components
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";

function App() {
  // Invoke the hooks
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        {/* Nav */}
        <Nav />

        {/* Body of the page */}
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
