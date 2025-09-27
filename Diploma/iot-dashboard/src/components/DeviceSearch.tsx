import { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

export default function DeviceSearch({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [id, setId] = useState("esp32-dht01,esp32-sound01");
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        fullWidth
        label="Device ID (comma-separated for multiple)"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="esp32-dht01, esp32-sound01"
      />
      <Box>
        <Button
          variant="contained"
          disabled={!id.trim()}
          onClick={() => onSelect(id.trim())}
        >
          Open
        </Button>
      </Box>
    </Stack>
  );
}
