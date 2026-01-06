import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  
  const data = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4000 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 7000 },
    { month: "Jul", sales: 5000 },
    { month: "Aug", sales: 6000 },
    { month: "Sep", sales: 4000 },
    { month: "Oct", sales: 5000 },
    { month: "Nov", sales: 7000 },
    { month: "Dec", sales: 8000 },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <p className="mb-4">Monthly Sales Overview</p>

      <div className="bg-white p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#22c55e" name="Sales ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Dashboard;
