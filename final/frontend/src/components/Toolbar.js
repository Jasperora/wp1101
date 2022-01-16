import { styled } from "@mui/system";
import { Toolbar as MuiToolbar } from "@material-ui/core";

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up("sm")]: {
    height: 70,
  },
}));

export default Toolbar;
