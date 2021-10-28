import React from "react";
import "./Section.css";
import List from "../list/List";
import Item from "../../Components/todoItem/Item";

export default class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = { children: [] };
    this.input = React.createRef();
  }

  handleInput = (e) => {
    if (
      e.key === "Enter" &&
      this.input.current.value !== "" &&
      this.input.current.value !== undefined
    ) {
      const item = (
        <Item
          id={this.props.all}
          key={this.props.all}
          value={this.input.current.value}
          addCount={() => this.props.addCount()}
          addAll={() => this.props.addAll()}
          subCount={() => this.props.subCount()}
          subAll={() => this.props.subAll()}
        />
      );
      this.setState((state) => ({ children: [...state.children, item] }));
      // add item into array using setState
      this.props.addCount();
      this.props.addAll();
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
        <List children={this.state.children} id="List" />
      </section>
    );
  }
}
