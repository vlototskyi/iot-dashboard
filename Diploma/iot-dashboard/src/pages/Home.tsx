import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import DeviceSearch from "../components/DeviceSearch";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Stack spacing={3}>
      {!isAuthenticated ? (
        <Box
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5">
            Будь ласка, увійдіть, щоб отримати доступ до телеметрії пристроїв
          </Typography>
          <Button
            variant="contained"
            style={{ color: "#fff", width: "200px", marginTop: "30px" }}
            onClick={() => loginWithRedirect()}
          >
            Увійти
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="h5">Пошук телеметрії</Typography>
          <Card>
            <CardContent>
              <DeviceSearch
                onSelect={(id) => navigate(`/device/${encodeURIComponent(id)}`)}
              />
            </CardContent>
          </Card>
        </>
      )}
    </Stack>
  );
}
