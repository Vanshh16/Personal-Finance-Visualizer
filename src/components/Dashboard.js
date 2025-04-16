"use client";

import SummaryCards from "@/components/SummaryCards";
import CategoryPieChart from "@/components/CategoryPieChart";
import TransactionList from "@/components/TransactionList";

export default function Dashboard({ transactions, onDelete, onEdit }) {
  const latestTransactions = transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5); // top 5 recent

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Summary Cards */}
      <SummaryCards transactions={transactions} />

      {/* Category Breakdown Chart */}
      <CategoryPieChart transactions={transactions} />

      {/* Most Recent Transactions */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Recent Transactions
        </h2>
        <TransactionList
          transactions={latestTransactions}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
}
