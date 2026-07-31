import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CarTopView from './components/CarTopView';
import DraggableDot from './components/DraggableDot';
import styles from './App.styles';
import DistanceMeasure from './components/DistanceMeasure';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CarTopView />
      <DraggableDot />
      <DistanceMeasure
        carPosition={{x: 200,y: 300}}
        dotPosition={{x: 350,y: 450}}
        maxDistance={500}
      />
    </SafeAreaView>
  );
}
