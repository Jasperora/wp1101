import React from "react";
import "./Footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="todo-app__footer hide">
        <div className="todo-app__total"></div>
        <ul className="todo-app__view-buttons">
          <li id="all">
            <button>All</button>
          </li>
          <li id="active">
            <button>Active</button>
          </li>
          <li id="completed">
            <button>Completed</button>
          </li>
        </ul>
        <div className="todo-app__clean">
          <button className="hidden" id="clean">
            Clear completed
          </button>
        </div>
      </footer>
    );
  }
}
