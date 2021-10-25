import React from "react";
import "./App.css";
import Section from "./Containers/section/Section";
import Footer from "./Containers/footer/Footer";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, all: 0 };
  }

  render() {
    return (
      <div id="root" className="todo-app__root">
        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
        </header>
        <Section count={this.count} all={this.all} id="Section" />
        <Footer count={this.count} id="Footer" />
      </div>
    );
  }
}
