import React from "react";
import "./todoItem.css";
import X from "./x.png";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
    };
  }

  handleFinish = () => {
    this.setState({ finished: !this.state.finished });
  };

  render() {
    return (
      <li className="todo-app__item">
        <div className="todo-app__checkbox">
          <input
            className="hidden"
            type="checkbox"
            id={this.props.id}
            onClick={this.handleFinish}
          ></input>
          <label htmlFor={this.props.id}></label>
        </div>
        <h1 className="todo-app__item-detail">{this.props.value}</h1>
        <img src={X} alt="x" className="todo-app__item-x" />
      </li>
    );
  }
}
