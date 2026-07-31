import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import SignalBar from "./components/SignalBar";
import CarTopView from "./components/CarTopView";
import DistanceGauge from "./components/DistanceGauge";
import Radar from "./components/Radar";
import HeadphoneDot from "./components/HeadphoneDot";
import BluetoothService from "./bluetooth/BluetoothService";
import { rssiToDistance } from "./utils/rssiToDistance";

const { width } = Dimensions.get("window");

const CAR_SIZE = 220;
const MAX_RADIUS = 150;

export default function App() {
  const [device, setDevice] = useState<any>(null);
  const [rssi, setRssi] = useState<number>(-100);
  const [distance, setDistance] = useState<number>(0);
  const [status, setStatus] = useState("Searching...");
  const [angle, setAngle] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    startBluetooth();
  }, []);

  useEffect(() => {
    if (!connected) return;

    const interval = setInterval(async () => {
      try {
        const value = await BluetoothService.readRSSI();

        if (value == null) return;

        setRssi(value);

        const d = rssiToDistance(value);

        setDistance(d);

        setAngle((a) => a + 0.2);

        if (value > -55) setStatus("Very Close");
        else if (value > -65) setStatus("Close");
        else if (value > -75) setStatus("Far");
        else setStatus("Very Far");
      } catch (e) {
              console.log(e)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [connected]);

  const startBluetooth = async () => {
    try {
      setStatus("Scanning...");

      const found = await BluetoothService.connectToHeadphones();

      if (!found) {
        setStatus("No headphones found");
        return;
      }

      setDevice(found);

      setConnected(true);

      setStatus("Connected");
    } catch (e) {
      console.log(e)
      setStatus("Connection Failed");
    }
  };

  const radius = useMemo(() => {
    return Math.min(MAX_RADIUS, distance * 40);
  }, [distance]);

  const dotX = radius * Math.cos(angle);

  const dotY = radius * Math.sin(angle);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎧 Headphone Finder</Text>

      <View style={styles.radar}>
        <View style={styles.ring1} />
        <View style={styles.ring2} />
        <View style={styles.ring3} />

        <View
          style={[
            styles.dot,
            {
              transform: [
                { translateX: dotX },
                { translateY: dotY },
              ],
            },
          ]}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Device</Text>

        <Text style={styles.value}>
          {device?.name ?? "Not Connected"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>RSSI</Text>

        <Text style={styles.value}>{rssi} dBm</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Estimated Distance</Text>

        <Text style={styles.distance}>
          {distance.toFixed(2)} m
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Status</Text>

        <Text style={styles.status}>
          {status}
        </Text>
      </View>

      <View style={styles.signalContainer}>
        <View
          style={[
            styles.signal,
            {
              width: `${Math.max(
                5,
                Math.min(100, (100 + rssi) * 2)
              )}%`,
            },
          ]}
        />
      </View>

      {!connected && (
        <TouchableOpacity
          style={styles.button}
          onPress={startBluetooth}
        >
          <Text style={styles.buttonText}>
            Scan Again
          </Text>
        </TouchableOpacity>
      )}

      {!connected && (
        <ActivityIndicator
          size="large"
          color="#00c853"
          style={{ marginTop: 20 }}
        />
      )}

      <DistanceGauge
    distance={distance}
    rssi={rssi}
/>
<Radar size={380}>


    <HeadphoneDot
        x={dotX}
        y={dotY}
        distance={distance}
    />

</Radar>
<CarTopView>
  <HeadphoneDot
    x={dotX}
    y={dotY}
    distance={distance}
  />
</CarTopView>
<SignalBar
    rssi={rssi}
/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    paddingTop: 25,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  radar: {
    width: width,
    height: 420,
    justifyContent: "center",
    alignItems: "center",
  },

  ring1: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#2e7d32",
  },

  ring2: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: "#388e3c",
  },

  ring3: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 2,
    borderColor: "#43a047",
  },

  car: {
    width: CAR_SIZE,
    height: CAR_SIZE,
    resizeMode: "contain",
  },

  dot: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff3333",
  },

  card: {
    width: "90%",
    backgroundColor: "#222",
    marginVertical: 6,
    padding: 16,
    borderRadius: 14,
  },

  label: {
    color: "#aaa",
    fontSize: 14,
  },

  value: {
    color: "#fff",
    fontSize: 20,
    marginTop: 4,
  },

  distance: {
    color: "#00ff99",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 5,
  },

  status: {
    color: "#ffeb3b",
    fontSize: 22,
    fontWeight: "600",
  },

  signalContainer: {
    width: "90%",
    height: 18,
    backgroundColor: "#333",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 15,
  },

  signal: {
    height: "100%",
    backgroundColor: "#00e676",
  },

  button: {
    backgroundColor: "#00c853",
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 25,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});