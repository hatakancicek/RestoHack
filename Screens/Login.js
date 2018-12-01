import React, { Component } from 'react'
import Input from '../Components/Input';
import { Text, View, TextInput, Button, StyleSheet, } from 'react-native'

export default class Login extends Component {
  render() {
    const { toggle } = this.props;

    return (
      <View style={styles.root} >
        <Input />
        <Input />
        <Button onPress={toggle} title="Giriş Yap" />
        <Text> Sen yenisin galiba! </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
})