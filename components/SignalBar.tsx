// src/components/SignalBar.tsx

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";


interface Props {
  rssi: number;
}


export default function SignalBar({
  rssi,
}: Props) {


  const strength = useSharedValue(0);



  useEffect(()=>{

    const value =
      Math.max(
        0,
        Math.min(
          5,
          Math.floor(
            (rssi + 100) / 10
          )
        )
      );


    strength.value =
      withTiming(
        value,
        {
          duration:400
        }
      );


  },[rssi]);



  const getColor = ()=>{

    if(rssi > -55)
      return "#00ff66";


    if(rssi > -65)
      return "#ffee00";


    if(rssi > -75)
      return "#ff9900";


    return "#ff3030";

  };



  const bars =
    [1,2,3,4,5];



  return (

    <View style={styles.container}>


      <Text style={styles.title}>
        Bluetooth Signal
      </Text>



      <View style={styles.row}>

        {
          bars.map((bar)=>{


            const animatedStyle =
              useAnimatedStyle(()=>{

                return {

                  opacity:
                    strength.value >= bar
                    ? 1
                    : 0.2,

                  transform:[
                    {
                      scaleY:
                      strength.value >= bar
                      ? 1
                      : 0.6
                    }
                  ]

                };

              });



            return (

              <Animated.View
                key={bar}
                style={[
                  styles.bar,
                  {
                    height:
                      bar * 12,
                    backgroundColor:
                      getColor()
                  },
                  animatedStyle
                ]}
              />

            );

          })
        }


      </View>



      <Text style={styles.rssi}>
        {rssi} dBm
      </Text>


    </View>

  );

}



const styles = StyleSheet.create({

  container:{
    alignItems:"center",
    marginTop:20,
  },


  title:{
    color:"#aaa",
    fontSize:15,
    marginBottom:10,
  },


  row:{
    height:70,

    flexDirection:"row",

    alignItems:"flex-end",

    gap:6,
  },


  bar:{
    width:14,

    borderRadius:4,
  },


  rssi:{
    color:"#fff",

    marginTop:10,

    fontSize:18,

    fontWeight:"700",
  }

});