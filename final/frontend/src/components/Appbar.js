import * as React from "react";
import { AppBar as MuiAppBar } from "@material-ui/core";

function AppBar(props) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

export default AppBar;
