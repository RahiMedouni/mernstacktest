import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import BookDetailsModal from "./pages/BookDetails";
import SignupAdmin from "./pages/SignupAdmin";

function App() {
  const { user } = useAuthContext();

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
          <Route
            path='/adminsignup'
            element={!user ? <SignupAdmin /> : <Navigate to='/' />}
          />
          <Route path='/books' element={<BookDetailsModal />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
