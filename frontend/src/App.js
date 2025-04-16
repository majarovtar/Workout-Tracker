import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from './pages/Home'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from './components/Navbar'

function App() {

  const { user } = useAuthContext();

  return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                  path="/"
                  element={user ? <Home key="home" /> : <Navigate to="/login" />}
              />
                <Route
                    path="/login"
                    element={!user ? <Login key="login" /> : <Navigate to="/" />}
                />

                <Route
                    path="/signup"
                    element={!user ? <Signup key="signup" /> : <Navigate to="/" />}
                />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;