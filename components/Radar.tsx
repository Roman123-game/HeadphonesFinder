// src/components/Radar.tsx

import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";


interface Props {
  size?: number;
  children?: React.ReactNode;
}


export default function Radar({
  size = 360,
  children,
}: Props) {

  const rotation = useSharedValue(0);


  useEffect(() => {

    rotation.value = withRepeat(
      withTiming(
        360,
        {
          duration: 4000,
          easing: Easing.linear,
        }
      ),
      -1,
      false
    );

  }, []);


  const sweepStyle = useAnimatedStyle(() => {

    return {
      transform:[
        {
          rotate:
            `${rotation.value}deg`,
        }
      ]
    };

  });


  return (

    <View
      style={[
        styles.container,
        {
          width:size,
          height:size,
        }
      ]}
    >


      {/* Outer Ring */}

      <View
        style={[
          styles.ring,
          {
            width:size,
            height:size,
            borderRadius:size/2,
          }
        ]}
      />


      {/* Middle Ring */}

      <View
        style={[
          styles.ring,
          {
            width:size*0.65,
            height:size*0.65,
            borderRadius:size*0.325,
          }
        ]}
      />


      {/* Inner Ring */}

      <View
        style={[
          styles.ring,
          {
            width:size*0.35,
            height:size*0.35,
            borderRadius:size*0.175,
          }
        ]}
      />



      {/* Radar Sweep */}

      <Animated.View
        style={[
          styles.sweep,
          {
            width:size/2,
            height:2,
            left:size/2,
            top:size/2,
          },
          sweepStyle
        ]}
      />



      {/* Center */}

      <View
        style={styles.center}
      />



      {children}


    </View>

  );
}



const styles = StyleSheet.create({

  container:{
    justifyContent:"center",
    alignItems:"center",
    overflow:"hidden",
  },


  ring:{
    position:"absolute",

    borderWidth:1.5,

    borderColor:"#00ff88",

    opacity:0.35,
  },


  sweep:{
    position:"absolute",

    backgroundColor:"#00ff88",

    opacity:0.8,

    transformOrigin:"left center",
  },


  center:{
    width:18,
    height:18,

    borderRadius:9,

    backgroundColor:"#00ff88",

    shadowColor:"#00ff88",

    shadowOpacity:0.9,

    shadowRadius:10,

    elevation:8,
  }

});