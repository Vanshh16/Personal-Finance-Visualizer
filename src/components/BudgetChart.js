"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BudgetChart({ transactions, budgets }) {
  const currentMonth = new Date().toISOString().slice(0, 7); // "2025-04"

  // Filter transactions from the current month
  const filteredTx = transactions.filter((tx) =>
    tx.date.startsWith(currentMonth)
  );

  // Calculate actuals per category
  const actuals = {};
  filteredTx.forEach((tx) => {
    actuals[tx.category] = (actuals[tx.category] || 0) + tx.amount;
  });

  if (!budgets || budgets.length === 0) {
    return (
      <div className="mt-8 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Spending Insights
        </h2>
        <p className="text-gray-500">No budget data available.</p>
      </div>
    );
  }
  console.log(typeof(budgets));
  
  // Merge with budgets
  const data = budgets
    .filter((b) => b.month === currentMonth)
    .map((b) => ({
      category: b.category,
      budget: b.amount,
      actual: actuals[b.category] || 0,
    }));

  return (
    <div className="mt-8 w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Budget vs Actual (April 2025)
      </h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No budget data for this month.</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#60A5FA" name="Budget" />
            <Bar dataKey="actual" fill="#F87171" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
