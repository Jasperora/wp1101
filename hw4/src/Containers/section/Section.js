import React from "react";
import "./Section.css";
import List from "../list/List";
import Item from "../../Components/todoItem/Item";

export default class Section extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  setId = () => {
    let id;
    let idList = this.props.child.map((item) => item[0].props.id);
    if (idList.length !== 0) id = Math.max(...idList) + 1;
    else id = 0;
    return id;
  };

  handleInput = (e) => {
    if (
      e.key === "Enter" &&
      this.input.current.value !== "" &&
      this.input.current.value !== undefined
    ) {
      const id_assigned = this.setId();
      const item = [
        <Item
          id={id_assigned}
          key={id_assigned}
          value={this.input.current.value}
          addCount={() => this.props.addCount()}
          addAll={() => this.props.addAll()}
          subCount={() => this.props.subCount()}
          subAll={() => this.props.subAll()}
          deleteItem={(num) => this.props.deleteItem(num)}
          updateFinished={(_id, _f) => this.props.updateFinished(_id, _f)}
          child={this.props.child}
        />,
        false,
      ];

      // add item into array using setState
      this.props.addChild(item);
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
        <List
          All={this.props.All}
          Active={this.props.Active}
          Completed={this.props.Completed}
          child={this.props.child}
          id="List"
        />
      </section>
    );
  }
}
