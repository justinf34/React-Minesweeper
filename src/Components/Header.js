import React, { useState, useEffect } from "react";
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
  const [seconds, setSeconds] = useState(0);

  const handleDiffChange = (event) => {
    props.onDiffChange(event.target.value);
  };

  useEffect(() => {
    let interval = null;
    if (props.start) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!props.start && seconds !== 0) {
      clearInterval(interval);
      props.setTime(seconds);
      setSeconds(0);
    }
    return () => {
      clearInterval(interval);
    };
  }, [seconds, props.start]);

  return (
    <div className="header">
      <Select
        value={props.diff}
        variant="outlined"
        onChange={handleDiffChange}
        classes={{
          select: classes.select,
        }}
      >
        <MenuItem value="Easy">Easy</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
      </Select>
      <div className="flag-container">
        <span id="flag-logo">
          <FlagIcon />
        </span>
        <span id="flag-counter">{props.flags}</span>
      </div>
      <div className="timer-container">
        <span id="clock-logo">
          <AccessAlarmIcon />
        </span>{" "}
        <span id="time">{seconds}</span>
      </div>
    </div>
  );
}
