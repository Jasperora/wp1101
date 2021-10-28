import React from "react";
import "./Item.css";
import X from "./x.png";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
    };
    this.checkbox = React.createRef();
  }

  handleFinish = () => {
    this.setState((state) => ({ finished: !state.finished }));
    this.checkbox.current.checked = !this.checkbox.current.checked;
    if (this.state.finished) this.props.addCount();
    if (!this.state.finished) this.props.subCount();
  };

  render() {
    return (
      <li className="todo-app__item">
        <div className="todo-app__checkbox" onClick={this.handleFinish}>
          <input
            className="hidden"
            type="checkbox"
            id={this.props.id}
            key={this.props.id}
            ref={this.checkbox}
          ></input>
          <label htmlFor={this.props.id}></label>
        </div>
        <h1
          className={`todo-app__item-detail ${
            this.state.finished && "finished"
          }`}
        >
          {this.props.value}
        </h1>
        <img src={X} alt="x" className="todo-app__item-x" />
      </li>
    );
  }
}
