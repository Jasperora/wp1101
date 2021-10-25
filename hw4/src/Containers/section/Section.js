import React from "react";
import "./Section.css";
import List from "../list/List";
import Item from "../../Components/todoItem/todoItem";

export default class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: props.count, all: props.all, children: [] };
    this.input = React.createRef();
    this.list = React.createRef();
  }

  handleInput = (e) => {
    if (
      e.key === "Enter" &&
      this.input.current.value !== "" &&
      this.input.current.value !== undefined
    ) {
      const item = (
        <Item id={this.props.all} value={this.input.current.value} />
      );
      this.setState({ children: item });
      this.setState({ all: ++this.state.all });
      this.setState({ count: ++this.state.count });
      this.input.current.value = "";
    }
  };

  render() {
    return (
      <section className="todo-app__main">
        <input
          className="todo-app__input"
          type="text"
          placeholder="What needs to be done?"
          onKeyDown={this.handleInput}
          ref={this.input}
        ></input>
        <List
          children={this.state.children}
          ref={this.list}
          id="List"
          className="hide"
        />
      </section>
    );
  }
}
