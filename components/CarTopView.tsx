// src/components/CarTopView.tsx

import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";


interface Props {
  children?: React.ReactNode;
  size?: number;
}


export default function CarTopView({
  children,
  size = 220,
}: Props) {


  const radarSize = size * 1.7;


  return (

    <View
      style={[
        styles.container,
        {
          width: radarSize,
          height: radarSize,
        },
      ]}
    >


      {/* Radar */}

      <View
        style={[
          styles.ring,
          {
            width: radarSize,
            height: radarSize,
            borderRadius: radarSize / 2,
          },
        ]}
      />


      <View
        style={[
          styles.ring,
          {
            width: radarSize * 0.7,
            height: radarSize * 0.7,
            borderRadius: radarSize * 0.35,
          },
        ]}
      />


      <View
        style={[
          styles.ring,
          {
            width: radarSize * 0.4,
            height: radarSize * 0.4,
            borderRadius: radarSize * 0.2,
          },
        ]}
      />



      {/* Car body */}

      <View
        style={[
          styles.car,
          {
            width:size * 0.55,
            height:size,
            borderRadius:size * 0.12,
          },
        ]}
      >


        {/* Front windshield */}

        <View
          style={[
            styles.windshield,
            {
              width:size * 0.32,
              height:size * 0.22,
              top:size * 0.18,
            },
          ]}
        />


        {/* Rear window */}

        <View
          style={[
            styles.windowBack,
            {
              width:size * 0.32,
              height:size * 0.22,
              bottom:size * 0.18,
            },
          ]}
        />



        {/* Wheels */}

        <View style={[styles.wheel, styles.frontLeft]} />
        <View style={[styles.wheel, styles.frontRight]} />

        <View style={[styles.wheel, styles.backLeft]} />
        <View style={[styles.wheel, styles.backRight]} />


        {/* Lights */}

        <View style={styles.lightFrontLeft}/>
        <View style={styles.lightFrontRight}/>

      </View>


      {/* Headphone dot */}

      {children}


    </View>
  );
}



const styles = StyleSheet.create({

  container:{
    justifyContent:"center",
    alignItems:"center",
  },


  ring:{
    position:"absolute",
    borderWidth:2,
    borderColor:"#00ff88",
    opacity:0.35,
  },


  car:{
    backgroundColor:"#1976d2",
    position:"absolute",
    justifyContent:"center",
    alignItems:"center",

    shadowColor:"#000",
    shadowOpacity:0.5,
    shadowRadius:10,
    elevation:10,
  },


  windshield:{
    position:"absolute",
    backgroundColor:"#90caf9",
    borderRadius:10,
  },


  windowBack:{
    position:"absolute",
    backgroundColor:"#64b5f6",
    borderRadius:10,
  },


  wheel:{
    position:"absolute",
    width:18,
    height:35,
    backgroundColor:"#111",
    borderRadius:8,
  },


  frontLeft:{
    left:-8,
    top:35,
  },

  frontRight:{
    right:-8,
    top:35,
  },


  backLeft:{
    left:-8,
    bottom:35,
  },

  backRight:{
    right:-8,
    bottom:35,
  },


  lightFrontLeft:{
    position:"absolute",
    top:5,
    left:20,
    width:15,
    height:8,
    backgroundColor:"#fff",
    borderRadius:5,
  },


  lightFrontRight:{
    position:"absolute",
    top:5,
    right:20,
    width:15,
    height:8,
    backgroundColor:"#fff",
    borderRadius:5,
  },

});