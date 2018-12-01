import React, { Component } from 'react'
import { Text, Animated, ActivityIndicator, StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters';

export default class Loading extends Component {
  state = {
    opacity: new Animated.Value(1),
  };

  _hide = _ => {
    const { opacity } = this.state;

    Animated.timing(
      opacity,
      {
        toValue: 0,
        duration: 750,
      },
    ).start();
  }

  hide() {
    const { _hide } = this;

    setTimeout(_hide, 500);
  };

  render() {
    const { opacity } = this.state;

    return (
      <Animated.View style={{
        ...styles.root,
        opacity,
      }} >
        <Text style={styles.text} > RestoHack </Text>
        <ActivityIndicator size="large" color="#039BE5" />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: scale(25),
    color: '#01579B',
    fontWeight: 'bold',
    marginBottom: 10,
  },
})