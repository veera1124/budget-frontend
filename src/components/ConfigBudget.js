import React, { useState, useEffect } from 'react';
import { useBudget } from '../contexts/budgetContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { MutatingDots } from 'react-loader-spinner';

const ConfigBudget = () => {
  const navigate = useNavigate();
  const { addCategory, budget, removeCategory, fetchInitialBudget } = useBudget();
  const { isLoggedin } = useAuth();

  const [categoryName, setCategoryName] = useState('');
  const [allocatedAmount, setAllocatedAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const resetBudget = async () => {
      await fetchInitialBudget();
      setLoading(true);
    };

    if (!isLoggedin()) {
      toast.error('Please login first');
      navigate('/login');
    }

    resetBudget();
  }, [loading]);

  const handleAddCategory = () => {
    addCategory({ name: categoryName, amount: allocatedAmount });
    setCategoryName('');
    setAllocatedAmount('');
  };

  return loading ? (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">Configure Budget</h2>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryName"
              placeholder="Enter Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="allocatedAmount" className="form-label">
              Allocated Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="allocatedAmount"
              placeholder="Enter Allocated Amount"
              value={allocatedAmount}
              onChange={(e) => setAllocatedAmount(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleAddCategory}>
            Add Category
          </button>
        </div>
        <div className="col-md-6">
          {budget && budget.categories.length > 0 && (
            <div className="mt-4">
              <h3>Previous Categories</h3>
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Allocated Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {budget.categories.map((category) => (
                    <tr key={category.name}>
                      <td>{category.name}</td>
                      <td>{category.allocatedAmount}</td>
                      <td onClick={() => removeCategory(category._id)} className="text-danger">
                        <span style={{ cursor: 'pointer' ,display:'flex',justifyContent:'center'}}> <span class="material-symbols-outlined">
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
    <div style={{ marginLeft: '30vw', marginTop: '100px' }}>
      <MutatingDots
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default ConfigBudget;
