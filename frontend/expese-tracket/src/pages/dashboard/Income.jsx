import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";

import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import IncomeList from "../../components/income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";

function Income() {
  const [openAddIncome, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //Fetch All income Details
  const fetchIncomeDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/api/income/getallincome",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIncomeData(res.data.incomes);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);
  
  //Handle add income
  const handleAddIncome = async (e,income) => {
    e.preventDefault();
   
     if (!income.source.trim())
     {
       toast.error("Source is required");
       return;
     }
     if (!income.amount || isNaN(income.amount) || Number(income.amount) < 0) {
       toast.error("Invalid amount");
       return;
     }
     if (!income.date) {
       toast.error("Date is required");
     }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/income/addincome",
        income,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setOpenAddIncomeModal(false);
        fetchIncomeDetails();
      }
    } catch (error) {
      toast.error(error.message);
    }
    
  };
   
    
  //Handle Delete Income
  const handleDeleteIncome = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/income/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setOpenDeleteAlert({ show: false, data: null });
        fetchIncomeDetails();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //handle download excel
  const handleDownloadIncomeDetails = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/income/downloadexcel",
        {
          withCredentials: true,
          responseType: "blob",
        }
      );
      const URL = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = URL;
      link.setAttribute("download", "income.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(URL);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    };
  }
  return (
    <DashboardLayout activeMenu={"Income"}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncome}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm loading={loading} onAddIncome={handleAddIncome} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClick={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income detail?"
            onDelete={()=>handleDeleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;
