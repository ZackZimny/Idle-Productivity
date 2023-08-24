import React, { useEffect, useState } from 'react';
import { AppState, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import Timer from './Timer';
import Player from './Player';
import Enemy from './Enemy';
import { useInterval } from './UseInterval';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22FFAA",
  },
  text: {
    position: "absolute",
    top: Dimensions.get("window").height - 50,
    fontSize: 20,
  }
});

const Run: React.FC = () => {
  const initialHealth = 5;
  const animationLength = 2000;
  const [tick, setTick] = useState(false);
  const [health, setHealth] = useState(initialHealth);
  const [firstRun, setFirstRun] = useState(true);
  const [playerAnimationComplete, setPlayerAnimationComplete] = useState(false);
  const [enemyAnimationComplete, setEnemyAnimationComplete] = useState(false);
  const [appExited, setAppExited] = useState(false);

  useInterval(() => {
    setTick(active => !active);
    if ((playerAnimationComplete && firstRun) || (enemyAnimationComplete && !firstRun)) {
      setHealth(health => health - 1);
    }
  }, 1000);

  const handleDeath = () => {
    setFirstRun(false)
    setEnemyAnimationComplete(false);
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (nextAppState === "background") {
        setAppExited(true);
      }
    });

    return () => subscription.remove();
  })

  return (
    <View style={styles.container}>
      <Timer />
      <Player
        animationLength={animationLength}
        onAnimationComplete={() => setPlayerAnimationComplete(true)}
      />
      <Enemy
        tick={tick}
        health={health}
        resetHealth={() => setHealth(initialHealth)}
        onAnimationComplete={() => setEnemyAnimationComplete(true)}
        playerAnimationComplete={playerAnimationComplete}
        onDeath={handleDeath}
      />
      <Text style={styles.text}>
        {appExited ? "User has exited the app" : "User has not exited the app"}
      </Text>
    </View>
  );
};

export default Run;
