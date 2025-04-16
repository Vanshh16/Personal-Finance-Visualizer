"use client";

// export default function BudgetInsights({ transactions, budgets }) {
//   const currentMonth = new Date().toISOString().slice(0, 7);

//   const filteredTx = transactions.filter((tx) =>
//     tx.date.startsWith(currentMonth)
//   );

//   const actuals = {};
//   filteredTx.forEach((tx) => {
//     actuals[tx.category] = (actuals[tx.category] || 0) + tx.amount;
//   });

//   if (!budgets || budgets.length === 0) {
//     return (
//       <div className="mt-8 space-y-2">
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">
//           Spending Insights
//         </h2>
//         <p className="text-gray-500">No budget data available.</p>
//       </div>
//     );
//   }

//   const insights = budgets
//     .filter((b) => b.month === currentMonth)
//     .map((b) => {
//       const spent = actuals[b.category] || 0;
//       const remaining = b.amount - spent;

//       if (spent > b.amount) {
//         return {
//           category: b.category,
//           type: "over",
//           message: `You are over budget in ${b.category} by ₹${spent - b.amount}`,
//         };
//       } else if (spent === 0) {
//         return {
//           category: b.category,
//           type: "unused",
//           message: `You haven't spent anything in ${b.category} yet.`,
//         };
//       } else {
//         return {
//           category: b.category,
//           type: "ok",
//           message: `You’ve spent ₹${spent} out of ₹${b.amount} in ${b.category}. Keep it up!`,
//         };
//       }
//     });

//   return (
//     <div className="mt-8 space-y-2">
//       <h2 className="text-xl font-semibold text-gray-800 mb-2">
//         Spending Insights
//       </h2>
//       {insights.length === 0 ? (
//         <p className="text-gray-500">No budgets set for this month.</p>
//       ) : (
//         <ul className="space-y-2">
//           {insights.map((insight, i) => (
//             <li
//               key={i}
//               className={`p-3 rounded-lg text-sm ${
//                 insight.type === "over"
//                   ? "bg-red-100 text-red-800"
//                   : insight.type === "unused"
//                   ? "bg-gray-100 text-gray-700"
//                   : "bg-green-100 text-green-800"
//               }`}
//             >
//               {insight.message}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


import { AlertTriangle, CheckCircle, Info } from "lucide-react"; // Optional icons for UX

export default function BudgetInsights({ transactions, budgets }) {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const filteredTx = transactions.filter((tx) =>
    tx.date.startsWith(currentMonth)
  );

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
  const insights = budgets
    .filter((b) => b.month === currentMonth)
    .map((b) => {
      const spent = actuals[b.category] || 0;
      const remaining = b.amount - spent;

      if (spent > b.amount) {
        return {
          category: b.category,
          type: "over",
          message: `Over budget in ${b.category} by ₹${spent - b.amount}`,
        };
      } else if (spent === 0) {
        return {
          category: b.category,
          type: "unused",
          message: `No spending yet in ${b.category}.`,
        };
      } else {
        return {
          category: b.category,
          type: "ok",
          message: `₹${spent} out of ₹${b.amount} used in ${b.category}.`,
        };
      }
    });

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Spending Insights
      </h2>

      {insights.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-gray-500 shadow-sm">
          No budgets set for this month.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-4 rounded-xl shadow-sm ${
                insight.type === "over"
                  ? "bg-red-50 border border-red-200"
                  : insight.type === "unused"
                  ? "bg-gray-50 border border-gray-200"
                  : "bg-green-50 border border-green-200"
              }`}
            >
              <div className="mt-1">
                {insight.type === "over" && (
                  <AlertTriangle className="text-red-500 w-5 h-5" />
                )}
                {insight.type === "unused" && (
                  <Info className="text-gray-500 w-5 h-5" />
                )}
                {insight.type === "ok" && (
                  <CheckCircle className="text-green-500 w-5 h-5" />
                )}
              </div>
              <p className="text-sm font-medium text-gray-800">
                {insight.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
