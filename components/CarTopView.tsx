import React, { useMemo, useState } from "react";
import { View } from "react-native";

import styles from "./CarTopView.styles";
import DistanceMeasure from "./DistanceMeasure";
import DraggableDot from "./DraggableDot";

export interface Point {
  x: number;
  y: number;
}

interface Props {
  size?: number;
}

export default function CarTopView({
  size = 220,}: Props) {
  const radarSize = size * 1.7;
  const center = radarSize / 2;
  const carPosition = useMemo(
    () => ({
      x: center,
      y: center,
    }),
    [center]
  );

  const [dotPosition, setDotPosition] = useState<Point>({
    x: center,
    y: center,
  });

  return (
    <View
      style={[
        styles.container,
        {
          width: radarSize,
          height: radarSize,
        },
      ]}
    >
      {/* Radar */}

      <View
        style={[
          styles.ring,
          {
            width: radarSize,
            height: radarSize,
            borderRadius: radarSize / 2,
          },
        ]}
      />

      <View
        style={[
          styles.ring,
          {
            width: radarSize * 0.7,
            height: radarSize * 0.7,
            borderRadius: radarSize * 0.35,
          },
        ]}
      />

      <View
        style={[
          styles.ring,
          {
            width: radarSize * 0.4,
            height: radarSize * 0.4,
            borderRadius: radarSize * 0.2,
          },
        ]}
      />

      {/* Car */}

      <View
        style={[
          styles.car,
          {
            width: size * 0.55,
            height: size,
            borderRadius: size * 0.12,
          },
        ]}
      >
        <View
          style={[
            styles.windshield,
            {
              width: size * 0.32,
              height: size * 0.22,
              top: size * 0.18,
            },
          ]}
        />

        <View
          style={[
            styles.windowBack,
            {
              width: size * 0.32,
              height: size * 0.22,
              bottom: size * 0.18,
            },
          ]}
        />

        <View style={[styles.wheel, styles.frontLeft]} />
        <View style={[styles.wheel, styles.frontRight]} />
        <View style={[styles.wheel, styles.backLeft]} />
        <View style={[styles.wheel, styles.backRight]} />

        <View style={styles.lightFrontLeft} />
        <View style={styles.lightFrontRight} />
      </View>

      <DraggableDot
        initialPosition={carPosition}
        onMove={setDotPosition}
      />

      <DistanceMeasure
        carPosition={carPosition}
        dotPosition={dotPosition}
        maxDistance={radarSize / 2}
      />
    </View>
  );
}