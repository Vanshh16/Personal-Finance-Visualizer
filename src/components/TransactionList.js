import useFinanceStore from "@/store/FinanceStore";
import axios from "axios";
export default function TransactionList({ transactions, onDelete, onEdit }) {

    const {fetchData} = useFinanceStore();
    const handleDelete = async (id) => {
            if (confirm("Delete this transaction?")) {
              await axios.delete(`api/transactions/${id}`);
              onDelete(id);
              fetchData();
            }
          };
    return (
      <div className="max-h-[450px] overflow-auto rounded-xl shadow border border-gray-200 bg-white">
        <table className="min-w-full table-auto text-sm text-gray-800">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-3 text-left">Description</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3 text-center">Date</th>
              <th className="px-5 py-3 text-center">Category</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr
                key={tx._id}
                className={`border-t transition-all hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-5 py-4 font-medium">{tx.description}</td>
                <td className="px-5 py-4 text-right font-semibold text-green-600">
                  ₹{tx.amount}
                </td>
                <td className="px-5 py-4 text-center text-gray-600">
                  {new Date(tx.date).toLocaleDateString("en-IN")}
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    {tx.category}
                  </span>
                </td>
                <td className="px-5 py-4 text-center space-x-2">
                  <button
                    onClick={() => onEdit(tx)}
                    className="text-blue-600 hover:underline text-sm cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="text-red-600 hover:underline text-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  