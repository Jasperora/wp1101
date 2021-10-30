import React from "react";
import "./App.css";
import Section from "./Containers/section/Section";
import Footer from "./Containers/footer/Footer";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      all: 0,
      All: true,
      Active: false,
      Completed: false,
      clear: false,
    };
  }

  clearCompleted() {
    this.setState({ clear: true });
  }

  clearDone() {
    this.setState({ clear: false });
  }

  setAll() {
    this.setState(() => ({ All: true, Active: false, Completed: false }));
  }

  setActive() {
    this.setState(() => ({ All: false, Active: true, Completed: false }));
  }

  setCompleted() {
    this.setState(() => ({ All: false, Active: false, Completed: true }));
  }

  setClear() {
    this.setState(() => ({ clear: true }));
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
          All={this.state.All}
          Active={this.state.Active}
          Completed={this.state.Completed}
          clear={this.state.clear}
          count={this.state.count}
          all={this.state.all}
          id="Section"
          clearDone={() => this.clearDone()}
        />
        <Footer
          handleCountAdd={(count) => this.handleCountAdd(count)}
          count={this.state.count}
          all={this.state.all}
          setAll={() => this.setAll()}
          setActive={() => this.setActive()}
          setCompleted={() => this.setCompleted()}
          setClear={() => this.setClear()}
          id="Footer"
        />
      </div>
    );
  }
}
