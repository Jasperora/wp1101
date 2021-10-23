import React from "react";
import "./App.css";
import Section from "./Containers/section/Section";
import Footer from "./Containers/footer/Footer";

export default class App extends React.Component {
  render() {
    return (
      <div id="root" className="todo-app__root">
        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
        </header>
        <Section />
        <Footer />
      </div>
    );
  }
}
