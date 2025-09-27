import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Legend,
} from "recharts";
type Row = {
  ts: string;
  sound_percent_avg: number;
  sound_percent_peak: number;
};
export default function SoundChart({ data }: { data: Row[] }) {
  const rows = data.map((d) => ({
    ...d,
    t: new Date(d.ts).toLocaleTimeString(),
  }));
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={rows}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="t" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sound_percent_avg"
          stroke="#1976d2"
          name="Average"
        />
        <Line
          type="monotone"
          dataKey="sound_percent_peak"
          stroke="#d32f2f"
          name="Peak"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
