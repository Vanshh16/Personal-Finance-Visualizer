"use client";

import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import axios from "axios";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCards from "@/components/SummaryCards";
import Dashboard from "@/components/Dashboard";
import BudgetForm from "@/components/BudgetForm";
import BudgetChart from "@/components/BudgetChart";
import BudgetInsights from "@/components/BudgetInsights";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editingTx, setEditingTx] = useState(null);

  useEffect(() => {
    const loadTransactions = async () => {
      const res = await axios.get("api/transactions");    
      setTransactions(res.data);
    };
    loadTransactions();
  }, []);

  const handleAdd = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx._id !== id));
  };

  const handleEdit = (tx) => {
    setEditingTx(tx);
  };

  const handleEditComplete = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx._id === updatedTx._id ? updatedTx : tx))
    );
    setEditingTx(null);
  };

  const [budgets, setBudgets] = useState([]);

const handleAddBudget = (newBudget) => {
  setBudgets((prev) => [...prev, newBudget]);
};

  return (
    <main className="min-h-screen bg-white p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Personal Finance Tracker</h1>
      <Dashboard  
  transactions={transactions}
  onDelete={handleDelete}
  onEdit={setEditingTx}
/>
<BudgetForm onSubmit={handleAddBudget} />
<BudgetChart transactions={transactions} budgets={budgets} />
<BudgetInsights transactions={transactions} budgets={budgets} />


    </main>
  );
}
