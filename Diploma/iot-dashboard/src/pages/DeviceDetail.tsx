import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { queryByDevices } from "../api/client";
import type { Telemetry } from "../api/types";
import DhtChart from "../components/DhtChart";
import SoundChart from "../components/SoundChart";
import { lastWindow } from "../utils/timeWindow";

const POLL_MS = 10_000;

export default function DeviceDetail() {
  const { deviceId = "" } = useParams();
  const deviceIds = deviceId
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const [data, setData] = useState<Telemetry[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [windowMinutes, setWindowMinutes] = useState(60); // default 1h
  const timerRef = useRef<number | null>(null);

  const navigate = useNavigate();

  // loader used by initial fetch + polling
  const load = async () => {
    try {
      setErr(null);
      const items = await queryByDevices(deviceIds);
      setData(items);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Load failed";
      setErr(msg);
    }
  };

  useEffect(() => {
    // initial fetch
    void load();

    // clear any previous interval
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // polling (pause if tab hidden)
    const tick = () => {
      if (document.visibilityState === "visible") void load();
    };
    timerRef.current = window.setInterval(tick, POLL_MS);

    // cleanup on param change/unmount
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [deviceId]); // re-create polling when URL param changes

  const handleWindowChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: number | null
  ) => {
    if (newValue !== null) setWindowMinutes(newValue);
  };

  // all data already sorted asc by ts in the client
  const dhtAll = useMemo(
    () => (data ?? []).filter((d) => d.kind === "dht"),
    [data]
  );
  const soundAll = useMemo(
    () => (data ?? []).filter((d) => d.kind === "sound"),
    [data]
  );

  // windowed views
  const dhtData = useMemo(
    () => lastWindow(dhtAll, windowMinutes),
    [dhtAll, windowMinutes]
  );
  const soundData = useMemo(
    () => lastWindow(soundAll, windowMinutes),
    [soundAll, windowMinutes]
  );

  const lastDht = useMemo(() => dhtData.at(-1), [dhtData]);
  const lastSound = useMemo(() => soundData.at(-1), [soundData]);

  return (
    <Stack spacing={3}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-start" }}>
        <Button variant="outlined" onClick={() => navigate("/")}>
          ← Back
        </Button>
      </Box>

      <Typography variant="h5">
        Device{deviceIds.length > 1 ? "s" : ""}: {deviceIds.join(", ")}
      </Typography>
      {err && <Alert severity="error">{err}</Alert>}

      <Grid container spacing={3}>
        {/* Summary cards */}
        {dhtData.length > 0 && (
          <>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Temperature
                  </Typography>
                  <Typography variant="h4">
                    {lastDht ? `${lastDht.temperature.toFixed(1)} °C` : "—"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {lastDht
                      ? new Date(lastDht.ts).toLocaleString()
                      : "no data"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Humidity
                  </Typography>
                  <Typography variant="h4">
                    {lastDht ? `${lastDht.humidity.toFixed(0)} %` : "—"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {lastDht
                      ? new Date(lastDht.ts).toLocaleString()
                      : "no data"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
        {soundData.length > 0 && (
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Sound Peak
                </Typography>
                <Typography variant="h4">
                  {lastSound
                    ? `${lastSound.sound_percent_peak.toFixed(0)} %`
                    : "—"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {lastSound
                    ? new Date(lastSound.ts).toLocaleString()
                    : "no data"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* DHT chart + table */}
        {dhtData.length > 0 && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Temperature / Humidity
                </Typography>
                <DhtChart data={dhtData as any[]} />
              </CardContent>
            </Card>

            {/* DHT table */}
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Device</TableCell>
                    <TableCell align="right">Temperature (°C)</TableCell>
                    <TableCell align="right">Humidity (%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dhtData
                    .slice(-25)
                    .reverse()
                    .map((row, idx) => (
                      <TableRow key={`${row.device_id}-${row.ts}-${idx}`}>
                        <TableCell>
                          {new Date(row.ts).toLocaleTimeString()}
                        </TableCell>
                        <TableCell>{row.device_id}</TableCell>
                        <TableCell align="right">
                          {row.temperature.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {row.humidity.toFixed(0)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}

        {/* Sound chart + table */}
        {soundData.length > 0 && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sound Levels
                </Typography>
                <SoundChart data={soundData as any[]} />
              </CardContent>
            </Card>

            {/* Sound table */}
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Device</TableCell>
                    <TableCell align="right">Avg (%)</TableCell>
                    <TableCell align="right">Peak (%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {soundData
                    .slice(-25)
                    .reverse()
                    .map((row, idx) => (
                      <TableRow key={`${row.device_id}-${row.ts}-${idx}`}>
                        <TableCell>
                          {new Date(row.ts).toLocaleTimeString()}
                        </TableCell>
                        <TableCell>{row.device_id}</TableCell>
                        <TableCell align="right">
                          {row.sound_percent_avg.toFixed(0)}
                        </TableCell>
                        <TableCell align="right">
                          {row.sound_percent_peak.toFixed(0)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>

      {/* Window selector */}
      <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
        <ToggleButtonGroup
          value={windowMinutes}
          exclusive
          onChange={handleWindowChange}
          size="small"
        >
          <ToggleButton value={15}>15m</ToggleButton>
          <ToggleButton value={60}>1h</ToggleButton>
          <ToggleButton value={1440}>24h</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Stack>
  );
}
