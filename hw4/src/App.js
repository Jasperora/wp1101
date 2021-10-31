import React from "react";
import "./App.css";
import Section from "./Containers/section/Section";
import Footer from "./Containers/footer/Footer";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      child: [],
      count: 0,
      all: 0,
      All: true,
      Active: false,
      Completed: false,
      clear: false,
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem = (num) => {
    let newList = [];
    this.state.child.forEach((item) => {
      if (item[0].props.id !== num) {
        newList.push(item);
      }
    });
    this.setState(() => ({ child: newList }));
  };

  clear = (clear) => {
    if (clear) {
      let newList = [];
      newList = this.state.child.filter((item) => {
        return !item[1];
      });
      this.setState(() => ({ child: newList }));
      this.setState({ clear: false });
      this.setState(() => ({ all: newList.length }));
      this.setState(() => ({ count: newList.length }));
    }
  };

  addChild = (item) => {
    this.setState((state) => ({ child: [...state.child, item] }));
  };

  updateFinished = (_id, _f) => {
    let index = 0;
    while (this.state.child[index][0].props.id !== _id) {
      index++;
    }
    let newArray = (arr, idx) => {
      arr[idx][1] = _f;
      return arr;
    };
    this.setState(
      (state) => ({ child: newArray(state.child, index) }),
      () => {
        console.log(this.state.child.map((r) => r[1]));
      }
    );
  };

  clearCompleted() {
    this.setState({ clear: true });
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
    this.clear(this.state.clear);
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
          child={this.state.child}
          clearDone={() => this.clearDone()}
          deleteItem={(num) => this.deleteItem(num)}
          updateFinished={(_id, _f) => this.updateFinished(_id, _f)}
          addChild={(item) => this.addChild(item)}
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
