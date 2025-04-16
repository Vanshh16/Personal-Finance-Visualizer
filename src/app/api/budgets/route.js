import Budget from "@/models/Budget";
import connectDB from "@/lib/mongo";

export async function GET(req, res) {
  await connectDB();

  try {
    const budgets = await Budget.find();
    if (!budgets) {
      return new Response({ message: "Error Not Found" });
    }
    return new Response(JSON.stringify(budgets));
  } catch (error) {
    return new Response(error, { message: "Failed to get budgets." });
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    await connectDB();
    const { category, amount, month } = body.newBudget;

    const existing = await Budget.findOne({ category: category, month: month });
    if (existing) {
      const updated = await Budget.findByIdAndUpdate(
        existing._id,
        { category, amount, month },
        { new: true }
      );
      return new Response(JSON.stringify(updated));
    } else {
      const budget = await Budget.create({ category, amount, month });
      return new Response(JSON.stringify(budget));
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message, message: "Failed to save budget." })
    );
  }
}
