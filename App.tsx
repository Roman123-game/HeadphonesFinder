import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CarTopView from "./components/CarTopView";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CarTopView/>
  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
});