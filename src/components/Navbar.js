"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-10 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold italic text-blue-900">
      Finance Visualizer
      </Link>
      <div className="space-x-16">
        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link href="/budgets" className="text-gray-700 hover:text-blue-600">
          Budgets
        </Link>
        <Link href="/insights" className="text-gray-700 hover:text-blue-600">
          Insights
        </Link>
      </div>
    </nav>
  );
}
