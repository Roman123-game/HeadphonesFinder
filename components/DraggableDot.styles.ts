import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dot: {
    position: "absolute",
    width: 22,
    height: 22,
    borderRadius: 14,
    backgroundColor: "red",
    marginLeft: -14,
    marginTop: -14,
    zIndex: 100,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    // Android shadow
    elevation: 8,
  },
});

export default styles;