import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import BookDetailsModal from "./pages/BookDetails";
import BookReader from "./pages/BookReader";

function App() {
  const { user } = useAuthContext();

  // Check if the user is logged in and has the role of "admin"
  const isAdmin = user && user.role === "admin";

  return (
    <div className='App'>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route
            path='/'
            element={user ? <Home /> : <Navigate to='/login' />}
          />
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to='/' />}
          />
          <Route
            path='/signup'
            element={!user ? <Signup /> : <Navigate to='/' />}
          />
          {/* Conditionally render BookDetailsModal only if user is admin */}
          {isAdmin ? (
            <Route path='/books' element={<BookDetailsModal />} />
          ) : (
            <Route path='/readbooks' element={<BookReader />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
