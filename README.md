This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# Finance Visualizer

A modern and intuitive web application that helps users track their daily expenses, set monthly budgets, and visualize their spending behavior. Built using **Next.js**, **MongoDB**, and **Tailwind CSS** with **Recharts**, the app ensures a smooth and insightful experience for managing personal finances.

---

## Features

-  Add, edit, and delete your **expenses** and **budgets**
-  Visualize monthly expenses with **bar and pie charts**
-  Dashboard with **total spent**, **category breakdown**, and **latest transactions**
-  Smart **insights** on budget usage
-  Form validation using **Zod**
-  API requests made using **Axios**
-  Global state management for efficient data flow
-  Responsive light theme UI using **Tailwind CSS**
-  Backend powered by **MongoDB + Next.js API routes**

---

##  Project Structure

 ├── app/
│   ├── page.tsx              # Main Dashboard
│   ├── transactions/         # Add/View/Edit transactions
│   ├── budgets/              # Set/View/Edit budgets
│   └── insights/             # Budget insights & analysis
│
├── components/
│   ├── TransactionForm.tsx
│   ├── BudgetForm.tsx
│   ├── Charts/
│   ├── DashboardSummary.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
│
├── lib/
│   └── connectDB.ts          # MongoDB connection utility
│
├── models/
│   ├── Transaction.js
│   └── Budget.js
│
├── context/
│   └── GlobalContext.jsx     # Global state management
│
└── styles/
    └── globals.css


 
---

##  Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Recharts
- **Backend:** MongoDB, Mongoose, Next.js API Routes
- **Validation:** Zod
- **HTTP:** Axios

---

##  Setup Instructions

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/personal-finance-visualizer.git
cd personal-finance-visualizer
```

2. **Install dependencies** 
```bash
npm install
``` 

3. **Configure .env**

MONGODB_URI=your_mongodb_connection_string

4. **Run the development server**
```bash
npm run dev
```