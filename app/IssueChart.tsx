"use client";

import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import copyText from "./copyText";

const X_AXIS_DATA_KEY = "label";
const BAR_DATA_KEY = "value";

interface Props {
  closed: number;
  inProgress: number;
  open: number;
}

const IssueChart = ({ closed, inProgress, open }: Props) => {
  const data = [
    {
      [X_AXIS_DATA_KEY]: copyText.issueStatus_CLOSED,
      [BAR_DATA_KEY]: closed,
    },
    {
      [X_AXIS_DATA_KEY]: copyText.issueStatus_IN_PROGRESS,
      [BAR_DATA_KEY]: inProgress,
    },
    { [X_AXIS_DATA_KEY]: copyText.issueStatus_OPEN, [BAR_DATA_KEY]: open },
  ];

  return (
    <Card>
      <ResponsiveContainer height={400} width="100%">
        <BarChart data={data}>
          <XAxis dataKey={X_AXIS_DATA_KEY} />
          <YAxis />
          <Bar
            barSize={75}
            dataKey={BAR_DATA_KEY}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
