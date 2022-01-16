import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, TextField, Button, Grid } from "@material-ui/core";
import { message } from "antd";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "../components/Typography";
import AppFooter from "../components/AppFooter";
import AppAppBar from "../views/AppAppbar";
import AppForm from "../views/AppForm";
import withRoot from "../withRoot";
import { useMutation } from "@apollo/client";
import { useUser } from "../hook/useUser";
import { LOGIN_MUTATION } from "../graphql";

message.config({
  top: 75,
});

function SignIn() {
  const { setName, setIsLogin } = useUser();
  const [n, setN] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async () => {
    if (n === "") {
      message.error("Name field is required.");
    } else if (password === "") {
      message.error("Password field is required.");
    } else {
      const data = await login({
        variables: {
          name: n,
          password: password,
        },
      });
      if (data.data.login.status === "success") {
        setIsLogin(true);
        setName(n);
        navigate("/main");
        document.cookie = `jwt=${data.data.login.token}`;
      } else message.error("Wrong password,try again.");
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Sign In
        </Typography>
        <Typography variant="body2" align="center">
          {"Not a member yet? "}
          <Link
            onClick={() => {
              navigate("/signup");
            }}
            style={{ cursor: "pointer" }}
            align="center"
            underline="always"
          >
            Sign Up here
          </Link>
        </Typography>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "10vh" }}
        >
          <TextField
            value={n}
            fullWidth
            required
            label="Name"
            variant="outlined"
            className="post-content-editor"
            id="pid-create-content"
            align="center"
            onChange={(e) => {
              setN(e.target.value);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") await handleSubmit();
            }}
            margin="normal"
          />
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "10vh" }}
        >
          <TextField
            fullWidth
            required
            type="password"
            label="Password"
            variant="outlined"
            className="post-content-editor"
            id="pid-create-content"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter") await handleSubmit();
            }}
          />
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "10vh" }}
        >
          <Button
            fullWidth
            style={{ backgroundColor: "#ff1971", color: "#FFFFFF" }}
            startIcon={<SendIcon />}
            onClick={async () => await handleSubmit()}
          >
            Sign in
          </Button>
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "10vh" }}
        >
          <Button
            fullWidth
            style={{ backgroundColor: "#ff1971", color: "#FFFFFF" }}
            endIcon={<DeleteIcon />}
            onClick={() => {
              setName("");
              setPassword("");
            }}
          >
            Clear
          </Button>
        </Grid>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);
