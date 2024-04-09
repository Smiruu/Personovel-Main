import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StatisticScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const calculateStatistics = (users) => {
    if (!users || users.length === 0) {
      return [];
    }

    const monthCounts = {};

    // Initialize monthCounts with zero counts for all months
    const currentYear = new Date().getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => {
      const month = new Date(currentYear, i);
      return `${month.toLocaleString('default', { month: 'long' })} ${currentYear}`;
    });

    months.forEach(month => {
      monthCounts[month] = 0;
    });

    // Update monthCounts with counts from users
    users.forEach((user) => {
      if (user.paid_at) {
        const paidAt = new Date(user.paid_at);
        const month = `${paidAt.toLocaleString('default', { month: 'long' })} ${paidAt.getFullYear()}`;
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      }
    });

    // Convert monthCounts to statistics array
    const statistics = Object.entries(monthCounts).map(([monthYear, count]) => ({ monthYear, paidUsers: count }));

    return statistics;
  };

  const statistics = calculateStatistics(users);

  const totalUsers = users ? users.length : 0;

  // Calculate paid users count
  const paidUsers = users ? users.filter(user => user.paid_at).length : 0;

  // Calculate unpaid users count
  const unpaidUsers = totalUsers - paidUsers;

  return (
    <div className="statistics-container">
      <div>
        <h4>Total Users: {totalUsers}</h4>
        <h4>Paid Users: {paidUsers}</h4>
        <h4>Unpaid Users: {unpaidUsers}</h4>
      </div>
      <h3>Statistics</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={statistics}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }} // Adjust margins as needed
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="paidUsers" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatisticScreen;
