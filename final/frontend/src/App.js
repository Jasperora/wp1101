import * as React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
//Route
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Main from "./containers/Main";
import PublicRoute from "./routes/publicRoute";
import PrivateRoute from "./routes/privateRoute";
import { useEffect } from "react";
import { useUser } from "./hook/useUser";
import { useMutation } from "@apollo/client";
import { INITIALIZATION_MUTATION } from "./graphql";
import { useNavigate } from "react-router-dom";
function App() {
  return (
    <Router>
      <InsideApp />
    </Router>
  );
}

function InsideApp() {
  const { setName, setIsLogin } = useUser();
  const [initialization] = useMutation(INITIALIZATION_MUTATION);
  const navigate = useNavigate();
  useEffect(async () => {
    const data = await initialization({});
    if (data.data.initialization.status === "success") {
      setName(data.data.initialization.authName);
      setIsLogin(true);
      navigate('/main')
      //console.log("success");
    }
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/main"
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
export default App;
