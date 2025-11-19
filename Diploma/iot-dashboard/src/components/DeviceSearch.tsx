import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function DeviceSearch({
  onSelect,
}: {
  onSelect: (ids: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([
    "esp32-dht01",
    "esp32-sound01",
  ]);

  const handleChange = (event: any) => {
    setSelected(event.target.value as string[]);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" width="100%">
      <FormControl fullWidth>
        <InputLabel>Пристрої</InputLabel>
        <Select
          multiple
          value={selected}
          label="Devices"
          onChange={handleChange}
        >
          <MenuItem value="esp32-dht01">esp32-dht01</MenuItem>
          <MenuItem value="esp32-sound01">esp32-sound01</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <Button
          variant="contained"
          disabled={selected.length === 0}
          onClick={() => onSelect(selected)}
        >
          Пошук
        </Button>
      </Box>
    </Stack>
  );
}
