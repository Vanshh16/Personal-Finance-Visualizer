import connectDB from "@/lib/mongo";
import Transaction from "@/models/Transaction";

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return new Response(JSON.stringify(transactions), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  
  await connectDB();
  const transaction = await Transaction.create({
    amount: body.amount,
    date: body.date,
    description: body.description,
    category: body.category || "Other",
  });

  return new Response(JSON.stringify(transaction), {
    headers: { "Content-Type": "application/json" },
  });
}
