import React, { useState } from 'react'
import EmmojiPicker from '../EmojiPicker';
import { FaCircleNotch } from "react-icons/fa6";

function AddExpenseForm({loading, onAddExpense }) {
    const [expense, setExpense] = useState({
        amount: "",
        category: "",
        date: "",
        icon: "",
    });
    const handleChange = (e) => {
      setExpense({ ...expense, [e.target.name]: e.target.value });
    };
    return (
      <div>
        <form
          id="add-income-form"
          onSubmit={(e) => onAddExpense(e, expense)}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1 ">
            <p>Icon</p>
            <EmmojiPicker
              className="w-full border-2"
              icon={expense.icon}
              onSelect={(selectedIcon) =>
                setExpense({ ...expense, icon: selectedIcon })
              }
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="category">Expense Category</label>
            <input
              className="outline-none border bg-gray-200 border-gray-500 rounded-md p-2"
              id="category"
              type="text"
              placeholder="Ex. Groceries, Rent,etc"
              name="category"
              value={expense.category}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="amount">Amonut</label>
            <input
              className="outline-none border bg-gray-200 border-gray-500 rounded-md p-2"
              id="amount"
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="date">Date</label>
            <input
              className="outline-none border bg-gray-200 border-gray-500 rounded-md p-2"
              id="date"
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
            />
          </div>
          <button
            
            type="submit"
            className="bg-purple-600 text-white rounded-3xl p-2 w-[200px] mx-auto cursor-pointer"
          >
          {loading ? (
                                  <span className="flex items-center justify-center gap-1">
                                    <FaCircleNotch className="animate-spin" size={20} />
                                    please wait...
                                  </span>
                                ) : (
                                  "Add Expense"
                                )}
          </button>
        </form>
      </div>
    );
}

export default AddExpenseForm
