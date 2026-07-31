// src/components/CarTopView.tsx

import React from "react";
import {View} from "react-native";
import styles from "./CarTopView.styles";

interface Props {
  children?: React.ReactNode;
  size?: number;
}


export default function CarTopView({
  children,
  size = 220,
}: Props) {


  const radarSize = size * 1.7;


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



      {/* Car body */}

      <View
        style={[
          styles.car,
          {
            width:size * 0.55,
            height:size,
            borderRadius:size * 0.12,
          },
        ]}
      >


        {/* Front windshield */}

        <View
          style={[
            styles.windshield,
            {
              width:size * 0.32,
              height:size * 0.22,
              top:size * 0.18,
            },
          ]}
        />


        {/* Rear window */}

        <View
          style={[
            styles.windowBack,
            {
              width:size * 0.32,
              height:size * 0.22,
              bottom:size * 0.18,
            },
          ]}
        />



        {/* Wheels */}

        <View style={[styles.wheel, styles.frontLeft]} />
        <View style={[styles.wheel, styles.frontRight]} />

        <View style={[styles.wheel, styles.backLeft]} />
        <View style={[styles.wheel, styles.backRight]} />


        {/* Lights */}

        <View style={styles.lightFrontLeft}/>
        <View style={styles.lightFrontRight}/>

      </View>


      {/* Headphone dot */}

      {children}


    </View>
  );
}



