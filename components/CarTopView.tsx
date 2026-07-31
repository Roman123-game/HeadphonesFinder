import React, { useState } from "react";
import { View } from "react-native";

import styles from "./CarTopView.styles";
import DraggableDot from "./DraggableDot";
import DistanceMeasure from "./DistanceMeasure";
import DistanceAlert from "./DistanceAlert"

export interface Point {
  x: number;
  y: number;
}

interface Props {
  size?: number;
  carScale?: number;
}


export default function CarTopView({
  size = 220,
  carScale = 0.65,
}: Props) {

  

  const radarSize = size * 1.7;

  const center = radarSize / 2;

  const carPosition: Point = {
    x: center,
    y: center,
  };


  const [dotPosition, setDotPosition] = useState<Point>(
    carPosition
  );
  
  const dx = dotPosition.x - carPosition.x;
const dy = dotPosition.y - carPosition.y;

const distance = Math.sqrt(
  dx * dx + dy * dy
);

const distancePercent = Math.min(
  Math.round(
    (distance / (radarSize / 2)) * 100
  ),
  100
);

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

      {/* Radar Outer Ring */}
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


      {/* Radar Middle Ring */}
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


      {/* Radar Inner Ring */}
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


      {/* Car Body */}
      <View
        style={[
          styles.car,
          {
            width: size * 0.55 * carScale,
            height: size * carScale,
            borderRadius: size * 0.12 * carScale,
          },
        ]}
      >

        {/* Front Windshield */}
        <View
          style={[
            styles.windshield,
            {
              width: size * 0.32 * carScale,
              height: size * 0.22 * carScale,
              top: size * 0.18 * carScale,
            },
          ]}
        />


        {/* Rear Window */}
        <View
          style={[
            styles.windowBack,
            {
              width: size * 0.32 * carScale,
              height: size * 0.22 * carScale,
              bottom: size * 0.18 * carScale,
            },
          ]}
        />


        {/* Wheels */}
        <View style={[styles.wheel, styles.frontLeft]} />
        <View style={[styles.wheel, styles.frontRight]} />

        <View style={[styles.wheel, styles.backLeft]} />
        <View style={[styles.wheel, styles.backRight]} />


        {/* Lights */}
        <View style={styles.lightFrontLeft} />
        <View style={styles.lightFrontRight} />


      </View>


      {/* Draggable Target */}
      <DraggableDot
        initialPosition={carPosition}
        onMove={setDotPosition}
      />


      {/* Distance */}
      <DistanceMeasure
        carPosition={carPosition}
        dotPosition={dotPosition}
        maxDistance={radarSize / 2}
      />
      <DistanceAlert
  distancePercent={distancePercent}
/>


    </View>
  );
}