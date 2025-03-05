import React, { useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setdashboardData } from "../../redux/dashboardslice";
import InfoCard from "../../components/cards/InfoCard";
import RecentTransactions from "./RecentTransactions";
import { addThousandsSeparator } from "../../utils/helper";
import { LuHandCoins, LuWallet, LuWalletMinimal } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import FinaceOverview from "./FinaceOverview";
import ExpenseTransactions from "./ExpenseTransactions";
import Last30DaysExpenses from "./Last30DaysExpenses";
import RecentIncomesWithChart from "../../components/charts/RecentIncomesWithChart";
import RecentIncomes from "./RecentIncomes";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dashboardData } = useSelector((store) => store.dashboard);
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/dashboard/get-dashboard-data",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setdashboardData(res.data));
        }
      } catch (error) {
        toast.error("Failed to fetch dashboard data");
      }
    }
    fetchDashboardData();
  }, []);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<LuWallet />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncomes || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <FinaceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncomes || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />
          <RecentIncomesWithChart
            data={
              dashboardData?.last60DaysIncomes?.transactions?.slice(0, 4) || []
            }
            totalIncome={dashboardData?.totalIncomes || 0}
          />
          <RecentIncomes
            transactions={dashboardData?.last60DaysIncomes?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
