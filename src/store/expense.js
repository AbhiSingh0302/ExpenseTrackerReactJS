import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = { expenses: [], total: 0 };

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    addExpenses(state, action) {
      state.expenses = [...state.expenses, ...action.payload];
      action.payload.forEach(ele => {
        state.total += Number(ele.amount);
      })
    },
    deleteExpense(state, action){
      state.total -= Number(state.expenses.find(ele => ele.id === action.payload).amount);
      state.expenses = state.expenses.filter(el => el.id !== action.payload);
    },
    editExpenses(state,action) {
      console.log(action.payload);
      state.expenses = state.expenses.map(ele => {
        if(ele.id === action.payload.id){
          state.total -= Number(ele.amount);
          return action.payload;
        }
        return ele;
      })
      state.total += Number(action.payload.amount);
    }
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
