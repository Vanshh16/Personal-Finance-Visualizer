"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import useFinanceStore from "@/store/FinanceStore";

const transactionSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});

const CATEGORY_OPTIONS = [
  "Food",
  "Travel",
  "Shopping",
  "Rent",
  "Utilities",
  "Health",
  "Other",
]; 
export default function TransactionForm({ onAdd, onEditComplete, editingTx }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Other");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const { fetchData } = useFinanceStore();
  useEffect(() => {
    if (editingTx) {
      setAmount(editingTx.amount);
      setDate(editingTx.date.slice(0, 10));
      setDescription(editingTx.description);
    }
  }, [editingTx]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate using Zod
    const result = transactionSchema.safeParse({
      amount,
      date,
      description,
      category,
    });

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const newTx = { amount, date, description, category };

    try {
      if (editingTx) {
        const res = await axios.put(`api/transactions/${editingTx._id}`, newTx);
        onEditComplete(res.data);
        fetchData();
      } else {
        const res = await axios.post("api/transactions", newTx);
        onAdd(res.data);
        fetchData();
      }

      setAmount("");
      setDate("");
      setDescription("");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white border border-gray-200 p-4 rounded-xl shadow"
    >
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        {editingTx ? "Update" : "Add"} Transaction
      </button>
    </form>
  );
}
