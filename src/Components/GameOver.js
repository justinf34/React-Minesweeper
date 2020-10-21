import React from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import FlagIcon from "@material-ui/icons/Flag";
import TimerIcon from "@material-ui/icons/Timer";

export default function GameOver(props) {
  const { open, game_state, time_elapsed, num_flags, onClose } = props;

  const getTitle = () => {
    if (game_state) {
      return "You Won!";
    } else {
      return "Game Over!";
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      aria-labelledby="game-over-dialog-title"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle id="game-over-dialog-title">{getTitle()}</DialogTitle>
      <List>
        <ListItem key={0}>
          <ListItemAvatar>
            <Avatar>
              <FlagIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={num_flags} />
        </ListItem>

        <ListItem key={1}>
          <ListItemAvatar>
            <Avatar>
              <TimerIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={time_elapsed} />
        </ListItem>
      </List>
      <DialogActions>
        <Button onClick={onClose}>Play Again</Button>
      </DialogActions>
    </Dialog>
  );
}
