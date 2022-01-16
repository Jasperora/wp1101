import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import AppBar from "../components/Appbar";
import Toolbar from "../components/Toolbar";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="text"
            underline="none"
            color="inherit"
            onClick={() => {
              navigate("/");
            }}
            sx={{ fontSize: 24 }}
          >
            {"Event Allocator"}
          </Button>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              color="inherit"
              variant="text"
              underline="none"
              onClick={() => {
                navigate("/signin");
              }}
              sx={rightLink}
            >
              {"Sign In"}
            </Button>
            <Button
              color="inherit"
              variant="text"
              underline="none"
              onClick={() => {
                navigate("/signup");
              }}
              sx={rightLink}
            >
              {"Sign Up"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
