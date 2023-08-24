
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    paddingTop: 50,
    fontSize: 60,
    textAlign: 'center',
  }
});

const Timer = () => {

  const [timeElapsed, setTimeElapsed] = useState(new Date().setTime(0));

  useEffect(() => {
    const timeStarted = new Date().getTime();
    const interval = setInterval(() => {
      setTimeElapsed(new Date().getTime() - timeStarted);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeElapsed / (1000 * 60 * 60));
  const minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);

  const getTimeString = () => {
    const hourString = hours == 0 ? "" : hours.toString() + ":";
    const minuteString = minutes < 10 && hours > 0 ? "0" + minutes : minutes;
    const secondString = seconds < 10 ? "0" + seconds : seconds;
    return hourString + minuteString + ":" + secondString;
  }

  const timeUp = seconds < 0;
  return (
    <Text style={styles.item}>{timeUp ? "Time's up!" : getTimeString()}</Text>
  );

}
export default Timer;
