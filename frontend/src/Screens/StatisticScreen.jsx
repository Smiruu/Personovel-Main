import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StatisticScreen() {
  // Sample data for demonstration
  const data = [
    { name: 'January', users: 400, books: 240 },
    { name: 'February', users: 300, books: 456 },
    { name: 'March', users: 500, books: 567 },
    { name: 'April', users: 600, books: 789 },
    { name: 'May', users: 800, books: 890 },
    { name: 'June', users: 700, books: 678 }
  ];

  return (
    <div className="statistics-container">
      <h3>Statistics</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#8884d8" />
          <Bar dataKey="books" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatisticScreen;