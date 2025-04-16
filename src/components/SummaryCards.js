"use client";

export default function SummaryCards({ transactions }) {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const latest = transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const count = transactions.length;

  const categoryTotals = {};
  transactions.forEach((tx) => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div className="p-5 bg-white rounded-xl shadow border text-center">
        <h3 className="text-sm text-gray-500">Total Expenses</h3>
        <p className="text-xl font-semibold text-red-600">₹{total.toFixed(2)}</p>
      </div>

      <div className="p-5 bg-white rounded-xl shadow border text-center">
        <h3 className="text-sm text-gray-500">Top Category</h3>
        <p className="text-lg font-medium text-indigo-600">
          {topCategory ? `${topCategory[0]} (₹${topCategory[1]})` : "N/A"}
        </p>
      </div>

      <div className="p-5 bg-white rounded-xl shadow border text-center">
        <h3 className="text-sm text-gray-500">Transactions</h3>
        <p className="text-xl font-semibold">{count}</p>
      </div>

      <div className="p-5 bg-white rounded-xl shadow border text-center">
        <h3 className="text-sm text-gray-500">Last Transaction</h3>
        {latest ? (
          <div>
            <p className="text-sm font-medium">{latest.description}</p>
            <p className="text-xs text-gray-500">
              ₹{latest.amount} on{" "}
              {new Date(latest.date).toLocaleDateString("en-IN")}
            </p>
          </div>
        ) : (
          <p className="text-gray-400">No transactions</p>
        )}
      </div>
    </div>
  );
}
