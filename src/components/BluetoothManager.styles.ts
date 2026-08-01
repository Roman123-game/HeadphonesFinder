import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  device: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  address: {
    color: "#666",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  connectedButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  refresh: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  connectionBox: {
    backgroundColor: "#dff7df",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  connectedText: {
    fontSize: 18,
    marginBottom: 10,
  },
  disconnect: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
export default styles;