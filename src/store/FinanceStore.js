import axios from "axios";
import { create } from "zustand";

const useFinanceStore = create((set) => ({
  transactions: [],
  budgets: [],
  loading: true,

  fetchData: async () => {
    set({ loading: true });
    try {
      const [tRes, bRes] = await Promise.all([
        axios.get("api/transactions"),
        axios.get("api/budgets"),
      ]);
      
      set({
        transactions: tRes.data,
        budgets: bRes.data,
        loading: false,
      });
    } catch (err) {
      console.error("Error fetching finance data:", err);
      set({ loading: false });
    }
  },

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),

  addBudget: (budget) =>
    set((state) => ({
      budgets: [...state.budgets, budget],
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t._id !== id),
    })),

  deleteBudget: (id) =>
    set((state) => ({
      budgets: state.budgets.filter((b) => b._id !== id),
    })),
  editTransaction: (updatedTx) =>
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx._id === updatedTx._id ? updatedTx : tx
      ),
    })),
}));

export default useFinanceStore;
