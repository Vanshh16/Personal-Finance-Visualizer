import connectDB from "@/lib/mongo";
import Transaction from "@/models/Transaction";

export async function DELETE(req, { params }) {
  await connectDB();
  const id = await params.id;
  await Transaction.findByIdAndDelete(id);
  return new Response("Transaction deleted", { status: 200 });
}

export async function PUT(req, { params }) {
  const data = await req.json();
  await connectDB();
  const id = await params.id;
  const updated = await Transaction.findByIdAndUpdate(id, data, { new: true });
  return new Response(JSON.stringify(updated), {
    headers: { "Content-Type": "application/json" },
  });
}
