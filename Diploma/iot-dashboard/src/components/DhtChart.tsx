import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
type Row = { ts: string; temperature: number; humidity: number };
export default function DhtChart({ data }: { data: Row[] }) {
  const rows = data.map((d) => ({
    ...d,
    t: new Date(d.ts).toLocaleTimeString(),
  }));
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={rows}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="t" />
        {/* <YAxis yAxisId="left" domain={["auto", "auto"]} /> */}
        <YAxis yAxisId="left" orientation="left" domain={[-50, 100]} />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temperature"
          name="°C"
          dot={false}
          stroke="#1976d2"
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="humidity"
          name="%"
          dot={false}
          stroke="#d32f2f"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
