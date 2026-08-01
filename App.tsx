import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CarTopView from './src/components/CarTopView';
import styles from './App.styles';
import BluetoothManager from './src/components/BluetoothManager';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
       <BluetoothManager />
      <CarTopView />
    </SafeAreaView>
  );
}
