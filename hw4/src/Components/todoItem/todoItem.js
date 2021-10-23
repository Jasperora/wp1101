import React from "react";
import "./todoItem.css";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
    };
  }

  render() {
    return (
      <li className="todo-app__item">
        <div className="todo-app__checkbox">
          <input type="checkbox" id={this.props.id}></input>
          <label htmlFor={this.props.id}></label>
        </div>
        <h1 className="todo-app__item-detail">{this.props.input}</h1>
        <img src="./x.png" alt="x" className="todo-app__item-x" />
      </li>
    );
  }
}
