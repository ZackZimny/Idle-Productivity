import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";

const spriteHeight = 32;
const overlapPadding = 6;
const midScreenX = Dimensions.get("window").width / 2 + spriteHeight / 2 - overlapPadding;

const styles = StyleSheet.create({
  item: {
    width: spriteHeight,
    height: spriteHeight,
    position: "absolute",
    top: Dimensions.get("window").height / 2 - spriteHeight / 2,
    backgroundColor: "#000000"
  }
});

type Props = {
  tick: boolean,
  health: number,
  resetHealth: () => void,
  onAnimationComplete: () => void,
  playerAnimationComplete: boolean,
  onDeath: () => void,
}

const Enemy = ({ tick, health, resetHealth, onAnimationComplete, playerAnimationComplete, onDeath }: Props) => {
  const [animationRunning, setAnimationRunning] = useState(false);
  const colorStyle = { backgroundColor: tick && playerAnimationComplete && !animationRunning ? "#000000" : "#FF2222" };
  let runAnim = useRef(new Animated.Value(1)).current;

  const runIn = () => {
    setAnimationRunning(true);
    Animated.timing(runAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      console.log("Enemy callback");
      onAnimationComplete();
      setAnimationRunning(false);
    });
  }

  useEffect(() => {
    if (health <= 0) {
      runAnim.setValue(0);
      runIn();
      onDeath();
      resetHealth();
    }
  });

  const slideAnim =
  {
    transform: [{
      translateX: runAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get("window").width + spriteHeight, midScreenX],
      })
    }]
  }

  return <Animated.View style={
    [
      styles.item,
      colorStyle,
      slideAnim,
    ]} />
}

export default Enemy;
