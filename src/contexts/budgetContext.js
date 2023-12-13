// BudgetContext.js
import React, { createContext, useContext, useState ,useEffect} from 'react';
import Axios from '../service';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BudgetContext = createContext();

export const useBudget = () => {
  return useContext(BudgetContext);
};

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState({
    id: '',
    name: '',
    amount: 0,
    categories: [],
    expenses: [],
    sortedExpenses: [],
  });

  const addCategory =async  (category) => {

    try{
        const response=await Axios.post('/budget/addCategoryToBudget',{
            budgetId:budget.id,
            name:category.name,
            allocatedAmount:category.amount
        });
       
        toast(response.data.message)
        fetchInitialBudget();
    }
    catch(err){
        console.log(err)
        toast('Cant make cate', err.message)
    }

    setBudget((prevBudget) => ({
      ...prevBudget,
      categories: [...prevBudget.categories, category],
    }));
  };

  const addExpense =async (expense) => {
    console.log(expense)
    try{
        const response = await Axios.post('/budget/addExpense',{
            description:expense.description,
            amount:expense.amount,
            categoryId:expense.categoryId,
            date:expense.date
        });
        toast(response.data.message)
        fetchInitialBudget();
    }
    catch(err){
        console.log(err)
        toast('Cant add expense', err.message)
    }
    setBudget((prevBudget) => ({
      ...prevBudget,
      expenses: [...prevBudget.expenses, expense],
    }));
  };
  const removeCategory = async (id) => {
    try{
        const response = await Axios.post('/budget/deleteCategory',{
            categoryId:id,
        });
        toast(response.data.message)
        fetchInitialBudget();
    }
    catch(err){
        console.log(err)
        toast('Cant remove category', err.message)
    }
    const newCategories = budget.categories.filter((category)=>{
        return category._id !== id;
    })
    setBudget((prevBudget) => ({
      ...prevBudget,
      categories: newCategories,
    }));
  }
  const removeExpense =async (id) => {
    try{
        const response = await Axios.post('/budget/deleteExpense',{
            expenseId:id,
        });
        toast(response.data.message)
        fetchInitialBudget();
    }
    catch(err){
        console.log(err)
        toast('Cant remove expense', err.message)
    }
    const newExpenses = budget.expenses.filter((expense)=>{
        return expense._id !== expense._id;
    })
    setBudget((prevBudget) => ({
      ...prevBudget,
      expenses: newExpenses,
    }));
  }
  const fetchInitialBudget = async () => {
    try {
      const response = await Axios.get('/budget/getAllBudgets');
      let expenses = await Axios.get('/budget/getAllUserExpense');
      let sortedExpenses = await Axios.get('/budget/getAllUserExpensesSortedByDate');
      expenses = expenses.data;
      const data = response.data;
      sortedExpenses = sortedExpenses.data;
      if(data[0]){
          setBudget({
              id: data[0]._id,
              name: data[0].name,
              amount: data[0].totalAmount,
              categories: data[0].categories,
              expenses:expenses,
              sortedExpenses:sortedExpenses
          });
       //   toast(  `Budget ${data[0].name} init  `)
      }
      else{
          toast('Creating your first budget ... ');
          try{
            const today = new Date();
            const startDate = today;
            const endDate = new Date(today);
            endDate.setDate(today.getDate() + 30);
            const response = await Axios.post('/budget/addBudget',{
                name:'My Budget',
                totalAmount:25000,
                startDate:startDate,
                // enddate should be after 30 days
                endDate:endDate,
            });
            toast(response.data.message)
            fetchInitialBudget();}
            catch(err){
                console.log(err)
                toast('Cant create budget', err.message)
            }
      }
      //  setBudget(data); // Assuming the API returns the entire budget object
    } catch (error) {
      console.error('Error fetching initial budget:', error.message);
     // toast('Error fetching initial budget:', error.message)
    }
  };
  useEffect(() => {
    // Fetch initial budget data from API
   

    fetchInitialBudget();
  }, []); 
  return (
    <BudgetContext.Provider value={{ budget, addCategory, addExpense ,removeExpense,removeCategory,fetchInitialBudget}}>
      {children}
       
    </BudgetContext.Provider>
  );
};
