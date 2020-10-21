import React, { Component } from "react";
import Cell from "./Cell";
import GameOver from "./GameOver";
import MSGame from "../utils/game-engine";

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: new MSGame(),
      open: false,
    };

    this.uncover = this.uncover.bind(this);
    this.mark = this.mark.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  renderBoard(board) {
    return board.map((row, y) => {
      return row.split("").map((col, x) => {
        return (
          <Cell
            val={col}
            key={x + "," + y}
            x={x}
            y={y}
            uncover={this.uncover}
            mark={this.mark}
          />
        );
      });
    });
  }

  uncover(row, col) {
    if (this.state.game.uncover(row, col)) {
      console.log(
        "After uncovering (",
        row,
        col,
        ")\n",
        this.state.game.getRendering().join("\n")
      );
      this.checkStatus();
    }
  }

  mark(row, col) {
    if (this.state.game.mark(row, col)) {
      console.log(
        "After marking (",
        row,
        col,
        ")\n",
        this.state.game.getRendering().join("\n")
      );
      this.checkStatus();
    }
  }

  checkStatus() {
    const gameStat = this.state.game.getStatus();
    if (gameStat.done) {
      this.setState((state, props) => {
        return { open: true };
      });
    } else {
      this.setState({});
    }
  }

  initBoard() {
    const new_game = new MSGame();
    let x, y, mines;
    console.log(this.props.diff);
    if (this.props.diff === "Easy") {
      x = 8;
      y = 10;
      mines = 10;
    } else {
      x = 14;
      y = 18;
      mines = 40;
    }
    new_game.init(x, y, mines);

    console.log("Start of game: \n", new_game.getRendering().join("\n"));

    this.setState((state, props) => {
      return { game: new_game };
    });
  }

  handleClose() {
    console.log("Closing dialog...");
    this.setState((state, props) => {
      return { open: false };
    });
  }

  componentDidMount() {
    this.initBoard();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.diff !== this.props.diff) {
      console.log("Difficulty changed");
      this.initBoard();
    }
  }

  render() {
    const { game } = this.state;
    const gameStatus = game.getStatus();
    return (
      <div className="gridwrapper">
        <div className={"grid" + " " + this.props.diff.toLowerCase()}>
          {this.renderBoard(game.getRendering())}
        </div>
        <GameOver
          open={this.state.open}
          game_state={
            gameStatus.nuncovered ===
            gameStatus.nrows * gameStatus.ncols - gameStatus.nmines
          }
          time_elapsed={0}
          num_flags={gameStatus.nmarked}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
