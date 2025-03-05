import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import toast from "react-hot-toast";
import axios from "axios";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import ExpenseList from "../../components/expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

function Expense() {
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://expense-tracker-kwhq.onrender.com/expense/getallexpense",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setExpenseData(res.data.expenses);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  const handleAddExpense = async (e, expense) => {
    e.preventDefault();
    setLoading(true);
    if (!expense.category.trim()) {
      toast.error("Category is required");
      return;
    }
    if (
      !expense.amount ||
      isNaN(expense.amount) ||
      Number(expense.amount) < 0
    ) {
      toast.error("Invalid amount");
      return;
    }
    if (!expense.date) {
      toast.error("Date is required");
    }
    try {
      const res = await axios.post(
        "https://expense-tracker-kwhq.onrender.com/expense/addexpense",
        expense,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setOpenAddExpenseModal(false);
        fetchExpenseDetails();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const res = await axios.get(
        "https://expense-tracker-kwhq.onrender.com/expense/downloadexcel",
        {
          withCredentials: true,
          responseType: "blob",
        }
      );
      const URL = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = URL;
      link.setAttribute("download", "expense.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(URL);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const res = await axios.delete(
        `https://expense-tracker-kwhq.onrender.com/expense/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setOpenDeleteAlert({ show: false, data: null });
        fetchExpenseDetails();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <DashboardLayout activeMenu={"Expense"}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1  gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm loading={loading} onAddExpense={handleAddExpense} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClick={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Expense;
