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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const salesData = [
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

  const userData = [
    { name: "Active Users", value: 2400 },
    { name: "New Users", value: 800 },
    { name: "Inactive", value: 400 },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#ef4444"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Monthly Performance & User Analytics</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Legend />
              <Bar dataKey="sales" fill="#22c55e" radius={[4, 4, 0, 0]} name="Sales ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">User Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {userData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;