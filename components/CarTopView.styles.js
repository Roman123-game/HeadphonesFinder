import { StyleSheet } from "react-native";

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

export default styles;