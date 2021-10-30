import React from "react";
import "./List.css";

export default class List extends React.Component {
  render() {
    return (
      <ul className="todo-app__list" id="todo-list">
        {this.props.All
          ? this.props.child.map((item) => <div className="">{item[0]}</div>)
          : this.props.Active
          ? this.props.child.map((item) => (
              <div className={`${item[1] && "hide"}`}>{item[0]}</div>
            ))
          : this.props.child.map((item) => (
              <div className={`${!item[1] && "hide"}`}>{item[0]}</div>
            ))}
      </ul>
    );
  }
}
