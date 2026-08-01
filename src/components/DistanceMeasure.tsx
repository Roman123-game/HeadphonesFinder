import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import styles from "./DistanceMeasure.styles";

type Position = {
  x: number;
  y: number;
};

type Props = {
  carPosition: Position;
  dotPosition: Position;
  maxDistance: number;
};


export default function DistanceMeasure({
  carPosition,
  dotPosition,
  maxDistance,
}: Props) {

  const [distancePercent, setDistancePercent] = useState(0);


  useEffect(() => {
    const dx = dotPosition.x - carPosition.x;
    const dy = dotPosition.y - carPosition.y;


    const distance = Math.sqrt(
      dx * dx + dy * dy
    );


    const percent = Math.min(
      (distance / maxDistance) * 100,
      100
    );


    setDistancePercent(
      Math.round(percent)
    );

  }, [
    carPosition,
    dotPosition,
    maxDistance,
  ]);


  return (
    <Text style={styles.text}>
      Distance: {distancePercent}%
    </Text>
  );
}