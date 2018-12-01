import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default props =>
  <TextInput {...props} style={{
    ...styles.root,
    ...props.style,
  }} />

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    marginVertical: 5,
    marginHorizontal: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: '#01579B',
    color: '#01579B',
  },
});