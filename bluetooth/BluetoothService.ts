// src/bluetooth/BluetoothService.ts

import { BleManager, Device } from "react-native-ble-plx";
import { PermissionsAndroid, Platform } from "react-native";

class BluetoothService {
  private manager: BleManager;
  private connectedDevice: Device | null = null;

  constructor() {
    this.manager = new BleManager();
  }

  async requestPermissions() {
    if (Platform.OS !== "android") return true;

    if (Platform.Version >= 31) {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      return Object.values(result).every(
        (v) => v === PermissionsAndroid.RESULTS.GRANTED
      );
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  async connectToHeadphones(): Promise<Device | null> {
    const granted = await this.requestPermissions();

    if (!granted) {
      throw new Error("Bluetooth permissions denied");
    }

    return new Promise((resolve) => {
      let finished = false;

      const timeout = setTimeout(() => {
        if (finished) return;

        finished = true;
        this.manager.stopDeviceScan();
        resolve(null);
      }, 10000);

      this.manager.startDeviceScan(
        null,
        {
          allowDuplicates: false,
        },
        async (error, device) => {
          if (error || !device || finished) return;

          const name =
            device.name ||
            device.localName ||
            "";

          // Change this filter to match your headphones
          if (
            name.includes("Sony") ||
            name.includes("JBL") ||
            name.includes("Bose") ||
            name.includes("AirPods") ||
            name.includes("Galaxy Buds") ||
            name.includes("Pixel Buds")
          ) {
            finished = true;

            clearTimeout(timeout);

            this.manager.stopDeviceScan();

            try {
              const connected = await device.connect();

              await connected.discoverAllServicesAndCharacteristics();

              this.connectedDevice = connected;

              resolve(connected);
            } catch {
              resolve(device);
            }
          }
        }
      );
    });
  }

  async readRSSI(): Promise<number | null> {
    if (!this.connectedDevice) return null;

    try {
      const updated = await this.connectedDevice.readRSSI();

      this.connectedDevice = updated;

      return updated.rssi ?? null;
    } catch {
      return null;
    }
  }

  async disconnect() {
    if (!this.connectedDevice) return;

    try {
      await this.connectedDevice.cancelConnection();
    } catch {}

    this.connectedDevice = null;
  }

  stopScan() {
    this.manager.stopDeviceScan();
  }

  destroy() {
    this.manager.destroy();
  }
}

export default new BluetoothService();