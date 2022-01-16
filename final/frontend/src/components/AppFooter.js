import * as React from "react";
import { Grid, Container } from "@material-ui/core";
import Typography from "./Typography";
import SkateboardingTwoToneIcon from "@mui/icons-material/SkateboardingTwoTone";

function Copyright() {
  return (
    <React.Fragment>
      <SkateboardingTwoToneIcon fontSize="small" />
      <b> Event Allocator 2021</b>
    </React.Fragment>
  );
}

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: "flex", bgcolor: "secondary.light" }}
    >
      <Container sx={{ my: 8, display: "flex" }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
