import React, { useEffect, useState } from 'react';
import {View,Text,FlatList,TouchableOpacity,ActivityIndicator} from 'react-native';
import RNBluetoothClassic, {BluetoothDevice} from 'react-native-bluetooth-classic';
import styles from './BluetoothManager.styles';

export default function BluetoothManager() {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] =
    useState<BluetoothDevice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    loadDevices();
  }, []);
  async function loadDevices() {
    try {
      setLoading(true);
      setError('');
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        await RNBluetoothClassic.requestBluetoothEnabled();
      }
      const paired = await RNBluetoothClassic.getBondedDevices();
      setDevices(paired);
    } catch (e) {
        console.log(e);
      setError('Failed loading Bluetooth devices');
    } finally {
      setLoading(false);
    }
  }
  async function connectDevice(device: BluetoothDevice) {
    try {
      setLoading(true);
      const connected = await device.connect();
      if (connected) {
        setConnectedDevice(device);
      }
    } catch (e) {
        console.log(e);
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  }
  async function disconnect() {
    try {
      if (connectedDevice) {
        await connectedDevice.disconnect();
        setConnectedDevice(null);
      }
    } catch {
      setError('Disconnect failed');
    }
  }
  function renderDevice({ item }: { item: BluetoothDevice }) {
    const connected = connectedDevice?.address === item.address;
    return (
      <View style={styles.device}>
        <View>
          <Text style={styles.name}>{item.name || 'Unknown device'}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, connected && styles.connectedButton]}
          onPress={() => connectDevice(item)}
        >
          <Text style={styles.buttonText}>
            {connected ? 'Connected' : 'Connect'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Devices</Text>
      {loading && <ActivityIndicator size="large" />}
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      {connectedDevice && (
        <View style={styles.connectionBox}>
          <Text style={styles.connectedText}>
            Connected: {connectedDevice.name}
          </Text>
          <TouchableOpacity style={styles.disconnect} onPress={disconnect}>
            <Text style={styles.buttonText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.refresh} onPress={loadDevices}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
      <FlatList
        data={devices}
        keyExtractor={item => item.address}
        renderItem={renderDevice}
      />
    </View>
  );
}
