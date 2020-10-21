import React from "react";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import FlagIcon from "@material-ui/icons/Flag";
import { makeStyles, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "6rem",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };
  return (
    <div className="header">
      <Select
        value={props.diff}
        variant="outlined"
        onChange={handleChange}
        classes={{
          select: classes.select,
        }}
      >
        <MenuItem value="Easy">Easy</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
      </Select>
      <div className="flag-contaier">
        <span id="flag-logo">
          <FlagIcon />
        </span>
        <span id="flag-counter">0</span>
      </div>
      <div className="timer">
        <span id="clock-logo">
          <AccessAlarmIcon />
        </span>{" "}
        <span id="time">000</span>
      </div>
    </div>
  );
}
