import React, {
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import styles from "./BluetoothManager.styles";
export default function BluetoothManager() {
  const [devices, setDevices] =
    useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] =
    useState<BluetoothDevice | null>(null);
  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState("");
  useEffect(() => {
    loadDevices();
  }, []);
  async function requestPermissions() {
    if (Platform.OS !== "android") {
      return true;
    }
    const permissions =
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
    const scan =
      permissions[
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
      ];
    const connect =
      permissions[
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      ];
    return (
      scan === PermissionsAndroid.RESULTS.GRANTED &&
      connect === PermissionsAndroid.RESULTS.GRANTED
    );
  }
  async function loadDevices() {
    try {
      setLoading(true);
      setError("");
      const permission =
        await requestPermissions();
      if (!permission) {
        setError(
          "Bluetooth permission denied"
        );
        return;
      }
      const enabled =
        await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        await RNBluetoothClassic.requestBluetoothEnabled();
      }
      const bondedDevices =
        await RNBluetoothClassic.getBondedDevices();
      console.log(
        "Bluetooth devices:",
        bondedDevices
      );
      setDevices(
        bondedDevices
      );
    } catch (e) {
      console.log(
        "FULL BLUETOOTH ERROR:",
        e
      );
      setError(
        e instanceof Error
          ? e.message
          : String(e)
      );
    } finally {
      setLoading(false);
    }
  }
  async function connectDevice(
    device: BluetoothDevice
  ) {
    try {
      setLoading(true);
      setError("");
      const connected =
        await device.connect();
      if (connected) {
        setConnectedDevice(
          device
        );
      }
    } catch(e) {
      console.log( "CONNECT ERROR:", e);
      setError(
        "Connection failed"
      );
    } finally {
      setLoading(false);
    }
  }
  async function disconnectDevice() {
    try {
      if (!connectedDevice) {
        return;
      }
      await connectedDevice.disconnect();
      setConnectedDevice(null);
    } catch(e) {
      setError(
        "Disconnect failed"
      );
    }
  }
  function renderDevice({
    item,
  }: {
    item: BluetoothDevice
  }) {
    const connected =
      connectedDevice?.address === item.address;
    return (
      <View style={styles.device}>
        <View style={styles.info}>
          <Text style={styles.name}>
            {item.name || "Unknown"}
          </Text>
          <Text style={styles.address}>
            {item.address}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            connected &&
            styles.connectedButton
          ]}
          onPress={() =>
            connectDevice(item)
          }
        >
          <Text style={styles.buttonText}>
            {
              connected
              ? "Connected"
              : "Connect"
            }
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bluetooth Devices
      </Text>
      {
        loading &&
        <ActivityIndicator size="large"/>
      }
      {
        error.length > 0 &&
        <Text style={styles.error}>
          {error}
        </Text>
      }
      {
        connectedDevice &&
        <View style={styles.connectedBox}>
          <Text style={styles.connectedText}>
            Connected:
            {" "}
            {connectedDevice.name}
          </Text>
          <TouchableOpacity
            style={styles.disconnect}
            onPress={
              disconnectDevice
            }
          >
            <Text style={styles.buttonText}>
              Disconnect
            </Text>
          </TouchableOpacity>
        </View>
      }
      <TouchableOpacity
        style={styles.refresh}
        onPress={loadDevices}
      >
        <Text style={styles.buttonText}>
          Refresh
        </Text>
      </TouchableOpacity>
      <FlatList
        data={devices}
        keyExtractor={
          item => item.address
        }
        renderItem={
          renderDevice
        }
      />
    </View>
  );
}