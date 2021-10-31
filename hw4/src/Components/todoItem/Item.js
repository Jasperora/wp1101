import React from "react";
import "./Item.css";
import X from "./x.png";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    if (
      this.props.child.some((item) => {
        return item[0].props.id === this.props.id && item[1];
      })
    ) {
      this.state = {
        finished: true,
      };
    } else {
      this.state = {
        finished: false,
      };
    }
    this.checkbox = React.createRef();
    this.handleX = this.handleX.bind(this);
  }

  handleFinish = (e) => {
    //prevent function from being executed twice
    e.preventDefault();
    this.setState(
      (state) => ({ finished: !state.finished }),
      () => {
        this.props.updateFinished(this.props.id, this.state.finished);
      }
    );
    if (this.state.finished) {
      this.props.addCount();
    }
    if (!this.state.finished) {
      this.props.subCount();
    }
  };

  handleX = () => {
    this.props.subAll();
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
            checked={this.state.finished}
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
        <img
          src={X}
          alt="x"
          className="todo-app__item-x"
          onClick={() => {
            this.props.deleteItem(this.props.id);
            this.handleX();
          }}
        />
      </li>
    );
  }
}
