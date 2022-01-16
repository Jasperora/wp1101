import { useState } from "react";
import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useUser } from "../hook/useUser";
import { v4 as uuidv4 } from "uuid";

const pages = ["My Calender", "My Events"];
const settings = ["Profile", "Logout"];

const MainBar = (props) => {
  const { name, setIsLogin } = useUser();
  // console.log("name: ",name)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser (event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav (null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser (null);
  };

  const handlePage = page => {
    if (page === 'My Calender') props.setShowPage ('My Calender');
    else if (page === 'My Events') props.setShowPage ('My Events');
  };


  const handleSetting = (setting) => {
    if (setting === "Profile") props.setShowPage(setting);
    else if (setting === "Logout") {
      // console.log("logout");
      setIsLogin(false);
      navigate("/");
      document.cookie = "jwt=";
    }
  };

  const stringToColor = string => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt (i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString (16)}`.substr (-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = name => {
    let arrayOfName = name.toUpperCase ().split (' ').filter (text => text);
    var showText = name;

    if (arrayOfName.length !== 2) {
      if (arrayOfName[0].length === 1) showText = `${arrayOfName[0]}`;
      else showText = `${arrayOfName[0][0]}${arrayOfName[0][1]}`;
    } else showText = `${arrayOfName[0][0]}${arrayOfName[1][0]}`;
    return {
      sx: {
        bgcolor: stringToColor (name),
      },
      children: showText,
    };
  };

  return (
    <AppBar position="relative" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
            onClick={() => props.setShowPage ('My Calender')}
          >
            Event Allocator
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean (anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'},
              }}
            >
              {pages.map (page => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu ();
                    handlePage (page);
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
          >
            Event Allocator
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map (page => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu ();
                  handlePage (page);
                }}
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar {...stringAvatar (name)} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean (anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map (setting => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseNavMenu ();
                    handleSetting (setting);
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainBar;
