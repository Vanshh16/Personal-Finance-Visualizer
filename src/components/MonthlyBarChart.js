"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyBarChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (!monthlyData[key]) monthlyData[key] = 0;
    monthlyData[key] += Number(tx.amount);
  });

  const MONTH_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const chartData = Object.entries(monthlyData).map(([key, total]) => {
    const [year, monthIndex] = key.split("-");
    const monthName = `${MONTH_NAMES[monthIndex - 1]} ${year}`;
    return {
      month: monthName,
      total,
    };
  });

  return (
    <div className="w-full h-96 bg-white rounded-xl shadow border p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
