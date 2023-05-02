import React from "react";
import { StyledStat } from "../styles/profilePageStyles";

import {
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Tooltip,
} from "recharts";

const Stats = ({ myProjects }) => {
  const stats = [
    { name: "Stars", count: 11 },
    { name: "Questions", count: 23 },
    { name: "Projects", count: myProjects?.length || 5 },
    { name: "Blogs", count: 4 },
  ];
  return (
    <StyledStat>
      <h3>Stats</h3>
      <div className="flex">
        <div className="stat">
          {stats.map((data, index) => (
            <h4 key={index}>
              {data.count} <br /> {data.name}
            </h4>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={stats}>
            <Bar dataKey="count" fill="var(--primary)" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </StyledStat>
  );
};

export default Stats;
