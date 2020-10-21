import React, { Component } from "react";

/**
 * Cell components that represent a tile in the board.
 * Can be interacted with by right-clicking and
 * left-clicking it. Holding it the left-click and
 * right-clicking does the same function
 *
 * src: https://stackoverflow.com/questions/48048957/react-long-press-event
 */
export default class Cell extends Component {
  constructor(props) {
    super(props);

    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
    this.rightClick = this.rightClick.bind(this);

    this.flag = false;
  }

  handleButtonPress(e) {
    if (e.nativeEvent.which === 1) {
      this.flag = true;
      this.buttonPressTimer = setTimeout(() => {
        this.flag = false;
        console.log("long press activated ");
        this.props.mark(this.props.y, this.props.x);
      }, 1500);
    }
  }

  handleButtonRelease(e) {
    if (e.nativeEvent.which === 1) {
      clearTimeout(this.buttonPressTimer);
      if (this.flag) {
        console.log("Not long enough...");
        this.props.uncover(this.props.y, this.props.x);
        this.flag = false;
      }
      console.log("Log hold stopped");
    }
  }

  rightClick(e) {
    e.preventDefault();
    console.log(e.type);
    console.log("Putting flag...");
    this.props.mark(this.props.y, this.props.x);
  }

  render() {
    return (
      <div
        className="cell"
        onMouseDown={this.handleButtonPress}
        onMouseUp={this.handleButtonRelease}
        onTouchStart={this.handleButtonPress}
        onTouchEnd={this.handleButtonRelease}
        onContextMenu={this.rightClick}
      >
        {this.props.val}
      </div>
    );
  }
}
