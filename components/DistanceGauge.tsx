// src/components/DistanceGauge.tsx

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";


interface Props {
  distance: number;
}


export default function DistanceGauge({distance}: Props) {

  const rssi = -100;
  const progress = useSharedValue(0);


  useEffect(() => {

    const value =
      Math.max(
        0,
        Math.min(
          1,
          1 - distance / 10
        )
      );


    progress.value =
      withTiming(
        value,
        {
          duration:500,
        }
      );


  }, [distance]);



  const circleStyle =
    useAnimatedStyle(() => {

      return {

        transform:[
          {
            scale:
              0.8 +
              progress.value * 0.2
          }
        ],

        opacity:
          0.4 +
          progress.value * 0.6,

      };

    });



  const getStatus = ()=>{

    if(distance < 1)
      return "VERY CLOSE";

    if(distance < 3)
      return "CLOSE";

    if(distance < 6)
      return "SEARCHING";

    return "FAR";

  };



  const getColor = ()=>{

    if(distance < 1)
      return "#00ff66";

    if(distance < 3)
      return "#ffee00";

    if(distance < 6)
      return "#ff9900";

    return "#ff3030";

  };



  return (

    <View style={styles.container}>


      <Animated.View
        style={[
          styles.circle,
          {
            borderColor:getColor()
          },
          circleStyle
        ]}
      >

        <Text
          style={[
            styles.distance,
            {
              color:getColor()
            }
          ]}
        >
          {distance.toFixed(2)}
        </Text>


        <Text style={styles.unit}>
          meters
        </Text>


      </Animated.View>



      <Text
        style={[
          styles.status,
          {
            color:getColor()
          }
        ]}
      >
        {getStatus()}
      </Text>



      <Text style={styles.signal}>
        Signal {rssi} dBm
      </Text>


    </View>

  );
}



const styles = StyleSheet.create({

  container:{
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
  },


  circle:{
    width:150,
    height:150,

    borderRadius:75,

    borderWidth:6,

    justifyContent:"center",
    alignItems:"center",

    backgroundColor:"#151515",

    shadowColor:"#000",
    shadowOpacity:0.4,
    shadowRadius:15,
    elevation:10,
  },


  distance:{
    fontSize:38,

    fontWeight:"800",
  },


  unit:{
    color:"#aaa",

    fontSize:15,

    marginTop:-5,
  },


  status:{
    marginTop:15,

    fontSize:20,

    fontWeight:"700",
  },


  signal:{
    marginTop:8,

    color:"#bbb",

    fontSize:16,
  },

});