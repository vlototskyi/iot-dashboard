import { useNavigate } from "react-router-dom";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import DeviceSearch from "../components/DeviceSearch";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Find a device</Typography>
      <Card>
        <CardContent>
          <DeviceSearch
            onSelect={(id) => navigate(`/device/${encodeURIComponent(id)}`)}
          />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Tip: try <code>esp32-dht01</code> or <code>esp32-sound01</code>
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
