"use client";

import BudgetForm from "@/components/BudgetForm";
import BudgetChart from "@/components/BudgetChart";
import { useEffect } from "react";
import useFinanceStore from "@/store/FinanceStore";
import axios from "axios";

export default function BudgetPage() {

  const { budgets, transactions, fetchData, addBudget } = useFinanceStore();
  const handleAddBudget = async (newBudget) => {
    addBudget(newBudget);
    try {
      const res = await axios.post("/api/budgets", {
        newBudget
      })
      // console.log(res);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col justify-center items-center py-2 px-8 space-y-6">
      <BudgetForm onSubmit={handleAddBudget} />
      <BudgetChart transactions={transactions} budgets={budgets} />
    </div>
  );
}
