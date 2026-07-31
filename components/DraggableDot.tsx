import React, { useRef } from "react";
import {
  Animated,
  PanResponder,
} from "react-native";

import styles from "./DraggableDot.styles";

export default function DraggableDot() {
  const position = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        position.setOffset({
          x: (position.x as any)._value,
          y: (position.y as any)._value,
        });

        position.setValue({
          x: 0,
          y: 0,
        });
      },


      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: position.x,
            dy: position.y,
          },
        ],
        {
          useNativeDriver: false,
        }
      ),


      onPanResponderRelease: () => {
        position.flattenOffset();
      },
    })
  ).current;


  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.dot,
        {
          transform: position.getTranslateTransform(),
        },
      ]}
    />
  );
}