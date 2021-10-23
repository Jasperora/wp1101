import React from "react";
import "./List.css";
import Item from "../../Components/todoItem/todoItem";

export default class List extends React.Component {
  render() {
    return (
      <ul className="todo-app__list " id="todo-list">
        <Item id="0" input="first todo" />
      </ul>
    );
  }
}
