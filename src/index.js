import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { AuthProvider } from './contexts/authContext';
import { BudgetProvider } from './contexts/budgetContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <Router>
    <AuthProvider>
      <BudgetProvider>
        <App />
      </BudgetProvider> 
    </AuthProvider>
    </Router>
 
);
