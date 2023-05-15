

import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';


import "./analytics.scss";

const Analytics = ({ userDataDB }) => {

  const colors = {
    income: '#64CFF6',
    outcome: '#6359E9',
  };


return (
    <div className="analytics">
      
      <div className="analytics__header">
        <h2>Analytics</h2>
        <div className="analytics__header_right">
          <div className="circle income"></div>
          <div className="analytics__header_text">Income</div>
          <div className="circle"></div>
          <div className="analytics__header_text">Outcome</div>
        </div>
      </div>
      <BarChart
        width={650}
        height={300}
        data={userDataDB.balance_history}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value">
        {userDataDB.balance_history ? userDataDB.balance_history.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[entry.type]} />
          
        )) : null}
        </Bar>
      </BarChart>
      
      <div className="analytics__label">Income / Outcome</div>

    </div>
  );
};


export default Analytics;