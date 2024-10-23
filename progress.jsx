import React, { useEffect } from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Animated ,{
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';
const SIZE = 200;
function App() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1)
  const reanimatedStyle = useAnimatedStyle(()=>{
    return {
      opacity:progress.value,
      transform:[{scale:scale.value}]
    }
  },[])
  useEffect(()=>{
    progress.value=withTiming(0,{duration:5000});
    scale.value = withTiming(0,{duration:5000})
  },[])
  return (
  <SafeAreaView style={styles.sectionContainer}>
    <Animated.View style={[{height:SIZE,width:SIZE,backgroundColor:"red"},reanimatedStyle]}/>
  </SafeAreaView>);
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex:1,
    marginTop: 32,
    paddingHorizontal: 24,
    justifyContent:"center",
    alignItems:"center"
  },
});

export default App;
