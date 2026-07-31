import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Animated,
  Text,
  TouchableOpacity,
  Vibration,
} from "react-native";

import styles from "./DistanceAlert.styles";


interface Props {
  distancePercent: number;
  limit?: number;
}


export default function DistanceAlert({
  distancePercent,
  limit = 15,
}: Props) {


  const [dismissed, setDismissed] = useState(false);


  const scale = useRef(
    new Animated.Value(1)
  ).current;



  const isDanger =
    distancePercent > limit;



  useEffect(() => {


    if (isDanger && !dismissed) {


      const animation = Animated.loop(
        Animated.sequence([

          Animated.timing(scale, {
            toValue: 1.15,
            duration: 400,
            useNativeDriver: true,
          }),


          Animated.timing(scale, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),

        ])
      );


      animation.start();


      // native vibration alert
      Vibration.vibrate(
        [0, 500, 300, 500],
        true
      );


      return () => {

        animation.stop();

        Vibration.cancel();

      };

    }


    scale.setValue(1);

    Vibration.cancel();


  }, [
    isDanger,
    dismissed,
    scale,
  ]);



  function resetAlert() {

    setDismissed(true);

    Vibration.cancel();

    scale.setValue(1);

  }



  // reset automatically when distance is safe again
  useEffect(() => {

    if (!isDanger) {
      setDismissed(false);
    }

  }, [
    isDanger,
  ]);



  if (!isDanger || dismissed) {
    return null;
  }



  return (

    <Animated.View
      style={[
        styles.alert,
        {
          transform:[
            {
              scale,
            },
          ],
        },
      ]}
    >

      <Text style={styles.title}>
        ⚠ WARNING ⚠
      </Text>


      <Text style={styles.message}>
       CHILD IN CAR
      </Text>


      <Text style={styles.distance}>
        Distance {distancePercent}%
      </Text>



      <TouchableOpacity
        style={styles.button}
        onPress={resetAlert}
      >

        <Text style={styles.buttonText}>
          RESET
        </Text>

      </TouchableOpacity>


    </Animated.View>

  );
}