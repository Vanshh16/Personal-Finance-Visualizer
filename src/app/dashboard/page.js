"use client"

import SummaryCards from "@/components/SummaryCards";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import useFinanceStore from "../../store/FinanceStore";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [editingTx, setEditingTx] = useState(null);
    const {
        transactions,
        loading,
        fetchData,
        addTransaction,
        editTransaction,
        deleteTransaction,
      } = useFinanceStore();

      const handleAdd = (newTx) => {
        addTransaction(newTx);
      };
      const handleEditComplete = (updatedTx) => {
        editTransaction(updatedTx);
        setEditingTx(null);
      };
      const handleDelete = (id) => {
        deleteTransaction(id);
      };
    
      const handleEdit = (tx) => {
        setEditingTx(tx);
      };
      useEffect(() => {
        fetchData();
      }, [fetchData]);
    
      if (loading) return <p className="min-h-screen flex flex-col justify-center items-center">Loading...</p>;

  return (
    <div className="flex flex-col justify-center items-center py-2 px-8 space-y-6">
      <SummaryCards transactions={transactions}/>
      <div className="grid md:grid-cols-2 gap-6">
        <TransactionForm onAdd={handleAdd} onEditComplete={handleEditComplete} editingTx={editingTx}/>
        <TransactionList onDelete={handleDelete} onEdit={handleEdit} transactions={transactions}/>
      </div>
      <MonthlyBarChart transactions={transactions}/>
      <CategoryPieChart transactions={transactions}/>
    </div>
  );
}
