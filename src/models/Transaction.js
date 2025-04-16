import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Food", "Travel", "Shopping", "Rent", "Utilities", "Health", "Other"],
    default: "Other",
    required: true,
  },
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
