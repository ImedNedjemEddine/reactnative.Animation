import {useEffect, useState} from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
export function Reanimated() {
  const [sliderProgress, setSliderProgress] = useState(0);
  const [reduce, setReduce] = useState(true);
  const rotate = useSharedValue(1)
  const progess = useSharedValue(1);
  const scale = useSharedValue(1);
  const MaxTime = 5000;
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progess.value,
      transform: [{scale: scale.value},{rotate:`${rotate.value*2*Math.PI}rad`}],
    };
  }, []);
  const hide = () => {
    progess.value = withTiming(0, {duration: sliderProgress});
  };
  const show = () => {
    progess.value = withTiming(1, {duration: sliderProgress});
  };
  const onScale = () => {
    setReduce(!reduce);
    scale.value = withTiming(2, {duration: sliderProgress});
  };
  const onReduce = () => {
    setReduce(!reduce);
    scale.value = withTiming(1, {duration: sliderProgress});
  };
  const onRotate = () => {
    rotate.value = withTiming(Math.floor(Math.random()*100)/100, {duration: sliderProgress});
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {height: 100, width: 100, backgroundColor: 'red', margin: 50},
          reanimatedStyle,
        ]}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{marginTop: -10, fontSize: 18, fontWeight: 'bold'}}>
          {Math.round(sliderProgress)}
        </Text>
        <View style={{height: 50, width: 200, margin: 10}}>
          <Slider
            value={0}
            onValueChange={value => setSliderProgress(value * MaxTime)}
          />
        </View>
        <Text style={{marginTop: -10, fontSize: 18, fontWeight: 'bold'}}>
          {5000}
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => show()}>
          <Text style={styles.btnTxt}>show with opacity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn1} onPress={() => hide()}>
          <Text style={styles.btnTxt}>hide with opacity</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn2} onPress={() => onRotate()}>
          <Text style={styles.btnTxt}>rotate</Text>
        </TouchableOpacity>
        {reduce ? (
          <TouchableOpacity style={styles.btn3} onPress={() => onScale()}>
            <Text style={styles.btnTxt}>scale</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btn3} onPress={() => onReduce()}>
            <Text style={styles.btnTxt}>reduce</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 150,
    height: 50,
    backgroundColor: 'rgba(0,100,200,1)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  btn1: {
    width: 150,
    height: 50,
    backgroundColor: 'rgba(200,30,0,1)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  btn2: {
    width: 150,
    height: 50,
    backgroundColor: 'rgba(0,200,0,1)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  btn3: {
    width: 150,
    height: 50,
    backgroundColor: 'rgba(200,200,200,1)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  btnTxt: {
    color: 'white',
    fontSize: 18,
  },
  btnContainer: {
    flexDirection: 'row',
  },
});
