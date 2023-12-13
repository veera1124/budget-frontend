import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes,useNavigate } from 'react-router-dom';
import { BudgetProvider } from './contexts/budgetContext';
import { AuthProvider } from './contexts/authContext';
import ConfigBudget from './components/ConfigBudget';
import AddExpense from './components/AddExpense';
import Dashboard from './components/Dashboard';
import Login from './components/login';
import Signup from './components/signup';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './contexts/authContext';
import {toast} from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Import our custom CSS file
const App = () => {

  const { isLoggedin,logout ,refreshToken} = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isLoggedin()) {
        refreshToken();
      }
    }, 50000);
  
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [isLoggedin, refreshToken]);
  
  const navigate = useNavigate();
  const logmeout=()=>{
    logout();
    window.location.reload();
    navigate('/login')
  }
  return (
  <>
    
          <div className="container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light detached-navbar">
  <Link className="navbar-brand" to="/dashboard">
    Personal Budget
  </Link>
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/config">
          Config Budget
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/add-expense">
          Add Expense
        </Link>
      </li>
      
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>


      {
        !isLoggedin() ? (<> <li className="nav-item">
        <Link className="nav-link" to="/login">
          <span className="nav-link-icon" role="img" aria-label="Login Icon">
            &#x1F512;
          </span>
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          <span className="nav-link-icon" role="img" aria-label="Register Icon">
            &#x1F4E6;
          </span>
          Register
        </Link>
      </li> </>): ( <li className="nav-item">
        <Link className="nav-link"  onClick={logmeout}>
          <span className="nav-link-icon" role="img" aria-label="Register Icon">
            &#x1F4E6;
          </span>
          Log Out
        </Link>
      </li>)
      }
    </ul>
  </div>
</nav>
<h1 style={{marginTop:'50px'}}></h1>

            <Routes>
              <Route path="/config" element={<ConfigBudget />} />
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="*" element={<Login />} />
            </Routes>
            <ToastContainer />
          </div>
   
      <footer className="bg-dark text-light text-center py-3">
      <div className="container">
        <p className="mb-0">&copy; 2023 Your Budget App. All rights reserved.</p>
      </div>
    </footer>
  </>
    
  );
};

export default App;
