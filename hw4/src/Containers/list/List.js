import React from "react";
import "./List.css";

export default class List extends React.Component {
  render() {
    let { children } = this.props;
    return (
      <ul className="todo-app__list" id="todo-list">
        {children.map((e) => e)}
      </ul>
    );
  }
}
