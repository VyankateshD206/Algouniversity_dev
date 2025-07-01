import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage'
import Contests from './pages/Contests';
import Leaderboard from './pages/Leaderboard';
import Problemset from './pages/Problemset';
import Submissions from './pages/Submissions';
import Solve from './pages/Solve';
import CompilerPage from './pages/CompilerPage';
import Layout from './Components/Layout';
import ProtectedRoute from './Components/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { login ,setLoading} from './store/authSlice'; // adjust path
import { getCurrentUser } from './Services/authService';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(setLoading(true));
    getCurrentUser()
      .then((res) => {
        dispatch(login(res.data));
      })
      .catch((err) => {
        console.error("Auto-login failed", err);
        localStorage.removeItem("token");
        dispatch(setLoading(false));
      });
  } else {
    dispatch(setLoading(false)); // no token, done loading
  }
}, []);


  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/register' element={<Register/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="problemset" element={<Problemset />} />
        <Route path="compiler" element={<CompilerPage />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="contests" element={<Contests />} />
        <Route path="solve/:id" element={<Solve />} />
      </Route>
    </Routes>
  );
}

export default App;
