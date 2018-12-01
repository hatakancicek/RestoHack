import React from 'react';
import { Text, StyleSheet, } from 'react-native';

export default ({ text }) =>
  <Text style={styles.text} >{text}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'white',
  }
});