import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

export default function Navigate(props) {
  const navigate = useNavigate();
  /*console.log();
  if (props === "success") */
  //console.log("navigate");
  navigate("/main");
  // return <Fragment></Fragment>;
}
