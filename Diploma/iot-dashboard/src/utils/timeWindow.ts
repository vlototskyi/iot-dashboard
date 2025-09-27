export function lastWindow<T extends { ts: string }>(
  rows: T[],
  minutes = 60
): T[] {
  if (!rows || rows.length === 0) return rows;
  const lastTs = new Date(rows[rows.length - 1].ts).getTime();
  const cutoff = lastTs - minutes * 60 * 1000;
  return rows.filter((r) => new Date(r.ts).getTime() >= cutoff);
}
