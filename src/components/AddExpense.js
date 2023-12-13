import React, { useState, useEffect } from 'react';
import { useBudget } from '../contexts/budgetContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { toast } from 'react-toastify';
import { Triangle } from 'react-loader-spinner';

const AddExpense = () => {
  const navigate = useNavigate();
  const { addExpense, budget, removeExpense, fetchInitialBudget } = useBudget();
  const { isLoggedin } = useAuth();

  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const resetBudget = async () => {
      if (!isLoggedin()) {
        toast.error('Please login first');
        navigate('/login');
      }
      await fetchInitialBudget();
      setLoading(true);
    };
    resetBudget();
  }, [loading]);

  useEffect(() => {
    if (budget && budget.categories) {
      setSelectedCategory(budget.categories[0]?._id || '');
    }
  }, [budget]);

  const handleAddExpense = () => {
    if (!selectedCategory) {
      alert('Please select a category for the expense.');
      return;
    }

    const formattedDate = new Date(expenseDate).toISOString();

    addExpense({
      description: expenseName,
      amount: expenseAmount,
      categoryId: selectedCategory,
      date: formattedDate,
    });

    setExpenseName('');
    setExpenseAmount('');
    setExpenseDate(new Date().toISOString().split('T')[0]);
    setSelectedCategory(budget.categories[0]?._id || '');
  };

  return loading ? (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Add Expense</h2>
          <div className="mb-3">
            <label htmlFor="expenseName" className="form-label">
              Expense Name
            </label>
            <input
              type="text"
              className="form-control"
              id="expenseName"
              placeholder="Enter Expense Name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expenseAmount" className="form-label">
              Expense Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="expenseAmount"
              placeholder="Enter Expense Amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(Number(e.target.value))}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expenseDate" className="form-label">
              Expense Date
            </label>
            <input
              type="date"
              className="form-control"
              id="expenseDate"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="selectedCategory" className="form-label">
              Select Category
            </label>
            <select
              className="form-control"
              id="selectedCategory"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {budget.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleAddExpense}>
            Add Expense
          </button>
        </div>
        <div className="col-md-6">
          {budget.expenses.length > 0 && (
            <div className="mt-4">
              <h3>Previous Expenses</h3>
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Category Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {budget.expenses.map((expense) => (
                    <tr key={expense._id}>
                      <td>{expense.description}</td>
                      <td>{expense.amount}</td>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                      <td>{expense.categoryName}</td>
                      <td onClick={() => removeExpense(expense._id)} className="text-danger">
                        <span style={{ cursor: 'pointer',display:'flex',justifyContent:'center' }}> <span class="material-symbols-outlined">
delete
</span></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div style={{ width: 'fitcontent', marginLeft: '30vw', marginTop: '100px' }}>
      <Triangle
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default AddExpense;
