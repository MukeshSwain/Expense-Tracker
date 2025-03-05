import React, { useState } from "react";
import EmmojiPicker from "../EmojiPicker";
import { FaCircleNotch } from "react-icons/fa6";

function AddIncomeForm({ onAddIncome,loading }) {
  
  const [income, setIncome] = useState({
    amount: "",
    source: "",
    date: "",
    icon: "",
  });
  const handleChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form
        id="add-income-form"
        onSubmit={(e) => onAddIncome(e, income)}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1 ">
          <p>Icon</p>
          <EmmojiPicker
            className="w-full border-2"
            icon={income.icon}
            onSelect={(selectedIcon) =>
              setIncome({ ...income, icon: selectedIcon })
            }
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="source">Icome Source</label>
          <input
            className="outline-none border bg-gray-200 border-gray-500 rounded-md p-2"
            id="source"
            type="text"
            placeholder="Ex. Salary,Freelancing,etc"
            name="source"
            value={income.source}
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
            value={income.amount}
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
            value={income.date}
            onChange={handleChange}
          />
        </div>
        <button
          form="add-income-form"
          type="submit"
          className="bg-purple-600 text-white rounded-3xl p-2 w-[200px] mx-auto cursor-pointer"
        >
           {loading ? (
                        <span className="flex items-center justify-center gap-1">
                          <FaCircleNotch className="animate-spin" size={20} />
                          please wait...
                        </span>
                      ) : (
                        "Add Income"
                      )}
        </button>
      </form>
    </div>
  );
}

export default AddIncomeForm;
