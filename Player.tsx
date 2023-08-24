import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";

const spriteHeight = 24;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FF0044",
    width: spriteHeight,
    height: spriteHeight,
    position: "absolute",
    top: Dimensions.get("window").height / 2 - spriteHeight / 2,
  }
});

type Props = {
  animationLength: number,
  onAnimationComplete: () => void,
}

const Player = ({ animationLength, onAnimationComplete }: Props) => {
  const runAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(runAnim, {
      toValue: 1,
      duration: animationLength,
      useNativeDriver: true,
    }).start(() => {
      onAnimationComplete();
    });
  }, [runAnim]);

  return (
    <Animated.View style={[
      styles.item,
      {
        transform: [{
          translateX: runAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Dimensions.get("window").width / 2 - spriteHeight / 2]
          })
        }],
      },
    ]} />
  );
}
export default Player;
