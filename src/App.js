import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header";
import Board from "./Components/Board";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: "Easy",
    };

    this.changeDifficulty = this.changeDifficulty.bind(this);
  }

  changeDifficulty(newDifficulty) {
    this.setState({
      difficulty: newDifficulty,
    });
  }

  render() {
    return (
      <Board
        diff={this.state.difficulty}
        changeDifficulty={this.changeDifficulty}
      ></Board>
    );
  }
}
