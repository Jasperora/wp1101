import React from "react";
import "./Footer.css";

export default class Footer extends React.Component {
  handleAll = () => {
    this.props.setAll();
  };
  handleActive = () => {
    this.props.setActive();
  };
  handleCompleted = () => {
    this.props.setCompleted();
  };
  handleClear = () => {
    this.props.setClear();
  };
  render() {
    return (
      <footer className={`todo-app__footer ${this.props.all === 0 && "hide"}`}>
        <div className="todo-app__total">{this.props.count} left</div>
        <ul className="todo-app__view-buttons">
          <li id="all">
            <button onClick={this.handleAll}>All</button>
          </li>
          <li id="active">
            <button onClick={this.handleActive}>Active</button>
          </li>
          <li id="completed">
            <button onClick={this.handleCompleted}>Completed</button>
          </li>
        </ul>
        <div className="todo-app__clean">
          <button
            className={`${this.props.count === this.props.all && "hidden"}`}
            id="clean"
            onClick={this.handleClear}
          >
            Clear completed
          </button>
        </div>
      </footer>
    );
  }
}
