import axios from "axios";
import type { LedgerRow, Telemetry } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

export async function queryByDevice(deviceId: string): Promise<Telemetry[]> {
  const { data } = await api.get<LedgerRow[]>(
    `/api/iot/query/${encodeURIComponent(deviceId)}`
  );
  return rowsToTelemetry(data);
}

export async function queryByDevices(
  deviceIds: string[],
  token
): Promise<Telemetry[]> {
  console.log("TOKEN => ", token);
  const calls = deviceIds.map((id) =>
    api
      .get<LedgerRow[]>(`/api/iot/query/${encodeURIComponent(id)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => r.data)
      .catch(() => [])
  );
  const allRows = (await Promise.all(calls)).flat();
  const telemetry = rowsToTelemetry(allRows);
  return telemetry;
}

function rowsToTelemetry(rows: LedgerRow[]): Telemetry[] {
  const items: Telemetry[] = [];
  for (const row of rows) {
    try {
      const parsed = JSON.parse(row.value);
      const kind: "dht" | "sound" =
        parsed.kind ?? (parsed.temperature !== undefined ? "dht" : "sound");
      items.push({ kind, ...parsed });
    } catch {
      /* ignore bad rows */
    }
  }
  items.sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime());
  return items;
}
