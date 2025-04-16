"use client";

import { useState } from "react";
import { z } from "zod";

// Define schema
const BudgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.number().min(1, "Amount must be at least 1"),
});

export default function BudgetForm({ onSubmit }) {
  const [formData, setFormData] = useState({ category: "", amount: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? value : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsed = BudgetSchema.safeParse({
      category: formData.category.trim(),
      amount: Number(formData.amount),
    });

    if (!parsed.success) {
      const fieldErrors = {};
      parsed.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      onSubmit({
        ...parsed.data,
        month: new Date().toISOString().slice(0, 7), // YYYY-MM
      });
      setFormData({ category: "", amount: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 mt-8 border border-gray-500 rounded-xl shadow-md space-y-4 w-full max-w-lg"
    >
      <div>
        <label className="block text-sm font-medium">Category</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g., Food"
          className="w-full border rounded px-3 py-2 mt-1"
        />
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Monthly Budget (₹)</label>
        <input
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
        />
        {errors.amount && (
          <p className="text-sm text-red-500">{errors.amount}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        Set Budget
      </button>
    </form>
  );
}
