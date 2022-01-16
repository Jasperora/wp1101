import * as React from "react";
import { useState } from "react";
import { useUser } from "../hook/useUser";
import { useNavigate } from "react-router";
import { Grid, Link, TextField, Button } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "../components/Typography";
import AppFooter from "../components/AppFooter";
import AppAppBar from "../views/AppAppbar";
import AppForm from "../views/AppForm";
import withRoot from "../withRoot";
import { message } from "antd";
import { CREATE_USER_MUTATION, LOGIN_MUTATION } from "../graphql";
import { useMutation } from "@apollo/client";

message.config({
  top: 75,
});

const SignUp = () => {
  const { name, setName, setIsLogin } = useUser();

  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [signUp] = useMutation(CREATE_USER_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async () => {
    if (name === "") {
      message.error("Name field is required.");
    } else if (pwd === "") {
      message.error("Password field is required.");
    } else if (pwdCheck === "") {
      message.error("Password Confirm field is required.");
    } else if (pwd !== pwdCheck)
      message.error("Password check is not equal to password.");
    else {
      const {
        data: {
          createUser: { status },
        },
      } = await signUp({
        variables: {
          name: name,
          password: pwd,
        },
      });

      if (status === "This name is used.") {
        message.error(status);
      }
      if (status === "success") {
        const data = await login({
          variables: {
            name: name,
            password: pwd,
          },
        });
        if (data.data.login.status === "success") {
          setIsLogin(true);
          setName(name);
          navigate("/main");
          document.cookie = `jwt=${data.data.login.token}`;
        } else message.error("Wrong password,try again.");
      }
    }
  };
  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link
              onClick={() => {
                navigate("/signin");
              }}
              style={{ cursor: "pointer" }}
              align="center"
              underline="always"
            >
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "10vh" }}
        >
          <TextField
            value={name}
            fullWidth
            required
            label="Name"
            variant="outlined"
            className="post-content-editor"
            id="pid-create-content"
            align="center"
            onChange={(e) => {
              setName(e.target.value);
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
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
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
          <TextField
            fullWidth
            required
            type="password"
            label="Password Confirm"
            variant="outlined"
            className="post-content-editor"
            id="pid-create-content"
            value={pwdCheck}
            onChange={(e) => setPwdCheck(e.target.value)}
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
            Sign up
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
              setPwd("");
            }}
          >
            Clear
          </Button>
        </Grid>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
};

export default withRoot(SignUp);
