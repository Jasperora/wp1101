import React from "react";
import "./App.css";
import Section from "./Containers/section/Section";
import Footer from "./Containers/footer/Footer";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, all: 0 };
  }

  addCount() {
    this.setState((state) => ({ count: ++state.count }));
  }

  addAll() {
    this.setState((state) => ({ all: ++state.all }));
  }

  subCount() {
    this.setState((state) => ({ count: --state.count }));
  }

  subAll() {
    this.setState((state) => ({ all: --state.all }));
  }

  render() {
    return (
      <div id="root" className="todo-app__root">
        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
        </header>
        <Section
          addCount={() => this.addCount()}
          addAll={() => this.addAll()}
          subCount={() => this.subCount()}
          subAll={() => this.subAll()}
          count={this.count}
          all={this.all}
          id="Section"
        />
        <Footer
          handleCountAdd={(count) => this.handleCountAdd(count)}
          count={this.state.count}
          all={this.state.all}
          id="Footer"
        />
      </div>
    );
  }
}
