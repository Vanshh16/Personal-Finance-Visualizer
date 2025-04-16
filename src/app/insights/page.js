"use client"

import BudgetInsights from "@/components/BudgetInsights";
import useFinanceStore from "@/store/FinanceStore";
import { useEffect } from "react";
export default function InsightsPage() {

    const {budgets, transactions, fetchData} = useFinanceStore();
    useEffect(() => {
        fetchData();
    }, [fetchData])
  return (
    <div className="flex flex-col justify-center items-center py-2 px-8 space-y-6">
      <BudgetInsights transactions={transactions} budgets={budgets} />
    </div>
  );
}
