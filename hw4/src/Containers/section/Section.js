import React from "react";
import "./Section.css";
import List from "../list/List";
import Item from "../../Components/todoItem/Item";

export default class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      child: [],
    };
    this.input = React.createRef();
    this.deleteItem = this.deleteItem.bind(this);
  }

  clear = () => {
    const newList = [];
    newList = this.state.child.filter((item) => {
      return !item[1];
    });
    this.setState(() => ({ child: newList }));
    this.props.clearDone();
  };

  deleteItem = (num) => {
    const newList = [];
    this.state.child.forEach((item) => {
      if (item[0].props.id !== num) newList.push(item);
    });
    this.setState(() => ({ child: newList }));
  };

  setId = () => {
    let id;
    let idList = this.state.child.map((item) => item[0].props.id);
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
          deleteItem={(num) => this.deleteItem(num)}
          updateFinished={(_id, _f) => this.updateFinished(_id, _f)}
        />,
        false,
      ];

      // add item into array using setState
      this.setState((state) => ({ child: [...state.child, item] }));
      this.props.addCount();
      this.props.addAll();
      this.input.current.value = "";
    }
  };

  updateFinished = (_id, _f) => {
    let index = 0;
    while (this.state.child[index][0].props.id !== _id) {
      index++;
    }
    let newArray = (arr, idx) => {
      arr[idx][1] = _f;
      return arr;
    };
    this.setState(
      (state) => ({ child: newArray(state.child, index) }),
      () => {
        console.log(this.state.child.map((r) => r[1]));
      }
    );
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
          child={this.state.child}
          id="List"
        />
      </section>
    );
  }
}
