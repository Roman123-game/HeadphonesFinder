// src/components/HeadphoneDot.tsx

import React, { useEffect } from "react";
import {View,StyleSheet} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

interface Props {
  x: number;
  y: number;
  distance?: number;
}

export default function HeadphoneDot({
  x,
  y,
  distance = 0,
}: Props) {

  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.5, {
          duration: 800,
        }),
        withTiming(1, {
          duration: 800,
        })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x,
        },
        {
          translateY: y,
        },
        {
          scale: pulse.value,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        animatedStyle,
      ]}
    >
      <View style={styles.innerDot} />

      <View
        style={[
          styles.distanceRing,
          {
            opacity:
              Math.max(
                0.1,
                Math.min(1, distance / 10)
              ),
          },
        ]}
      />
    </Animated.View>
  );
}


const styles = StyleSheet.create({

  dot: {
    position: "absolute",

    width: 26,
    height: 26,

    borderRadius: 13,

    backgroundColor: "#ff2020",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#ff0000",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },


  innerDot: {
    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: "#fff",
  },


  distanceRing: {
    position: "absolute",

    width: 60,
    height: 60,

    borderRadius: 30,

    borderWidth: 2,

    borderColor: "#ff3030",
  },

});