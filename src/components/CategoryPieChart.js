"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#FF6F91", "#B0A8B9"
];

function aggregateByCategory(transactions) {
  const map = {};
  for (const tx of transactions) {
    const cat = tx.category || "Other";
    map[cat] = (map[cat] || 0) + tx.amount;
  }

  return Object.entries(map).map(([category, amount]) => ({
    category,
    amount,
  }));
}
 
export default function CategoryPieChart({ transactions }) {
  const data = aggregateByCategory(transactions);

  return (
    <div className="w-full h-96 bg-white rounded-xl shadow border p-6 pb-10 mt-6">
      <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ category, percent }) =>
              `${category} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `₹${val}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
