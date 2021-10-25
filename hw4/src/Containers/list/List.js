import React from "react";
import "./List.css";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { children: "" };
  }
  render() {
    return (
      <ul className="todo-app__list" id="todo-list">
        {this.state.children}
      </ul>
    );
  }
}
