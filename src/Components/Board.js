import React, { Component } from "react";
import Cell from "./Cell";
import GameOver from "./GameOver";
import Header from "./Header";
import MSGame from "../utils/game-engine";

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: new MSGame(),
      open: false,
      flags: 10,
      start: false,
      timer: 0,
    };

    this.uncover = this.uncover.bind(this);
    this.mark = this.mark.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setTime = this.setTime.bind(this);
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
      if (!this.state.start) {
        this.checkStatus(true);
      } else {
        this.checkStatus(false);
      }
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
      this.checkStatus(false);
    }
  }

  checkStatus(first_move) {
    const gameStat = this.state.game.getStatus();
    if (gameStat.done) {
      this.setState((state, props) => {
        return { open: true, start: false };
      });
    } else {
      if (first_move) {
        console.log("first move");
        this.setState({ start: true });
      } else {
        this.setState({});
      }
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
      return {
        game: new_game,
        open: !state,
        flags: mines,
        start: false,
        timer: 0,
      };
    });
  }

  handleClose() {
    console.log("Closing dialog...");
    this.initBoard();
  }

  setTime(time) {
    this.setState((state, props) => {
      return { timer: time };
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
      <React.Fragment>
        <Header
          diff={this.props.diff}
          onDiffChange={this.props.changeDifficulty}
          flags={this.state.flags - gameStatus.nmarked}
          start={this.state.start}
          setTime={this.setTime}
        />
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
            time_elapsed={this.state.timer}
            num_flags={gameStatus.nmarked}
            onClose={this.handleClose}
          />
        </div>
      </React.Fragment>
    );
  }
}
