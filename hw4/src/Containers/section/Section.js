import React from "react";
import "./Section.css";
import List from "../list/List";

export default class Section extends React.Component {
  render() {
    return (
      <section className="todo-app__main">
        <input
          className="todo-app__input"
          type="text"
          placeholder="What needs to be done?"
        ></input>
        <List />
      </section>
    );
  }
}
