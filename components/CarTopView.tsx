// src/components/CarTopView.tsx

import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";

interface Props {
  children?: React.ReactNode;
  size?: number;
  source?: ImageSourcePropType;
}

export default function CarTopView({
  children,
  size = 220,
  source = require("../../assets/car_top.png"),
}: Props) {
  return (
    <View style={styles.container}>
      {/* Radar Rings */}

      <View style={styles.ringLarge} />

      <View style={styles.ringMedium} />

      <View style={styles.ringSmall} />

      {/* Car */}

      <Image
        source={source}
        style={{
          width: size,
          height: size,
          resizeMode: "contain",
        }}
      />

      {/* Headphone Dot */}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 380,
    height: 380,
    justifyContent: "center",
    alignItems: "center",
  },

  ringLarge: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 170,
    borderWidth: 2,
    borderColor: "#2ecc71",
    opacity: 0.2,
  },

  ringMedium: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: "#2ecc71",
    opacity: 0.4,
  },

  ringSmall: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#2ecc71",
    opacity: 0.7,
  },
});