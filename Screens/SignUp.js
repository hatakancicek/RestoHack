import React, { Component } from 'react'
import Input from '../Components/Input';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  Button, 
  StyleSheet,
} from 'react-native';

import firebase from 'firebase';

export default class Login extends Component {
  state = {
    mail: "",
    password: "",
  };

  setMail = mail => 
    this.setState({ mail, });

  setPassword = password => 
    this.setState({ password, });

  login = _ => {
    const { mail, password } = this.state;

    this.setState({
      loading: true,
    });

    firebase.auth().createUserWithEmailAndPassword(
      mail, password,
    ).catch(err => {
      console.log(err);
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { toggle } = this.props;
    const { mail, password, loading } = this.state;
    const { setMail, setPassword, login, } = this;

    return (
      <View style={styles.root} >
        <Input 
          onChangeText={setMail}
          placeholder="Mail"
          value={mail} 
        />
        <Input 
          onChangeText={setPassword}
          placeholder="Şifre"
          value={password} 
        />
        <Button 
          disabled={loading}
          onPress={login}
          title="Kayıt Ol" 
        />
        <TouchableOpacity onPress={toggle}>
          <Text> Sen eskisin galiba! </Text>
        </TouchableOpacity>
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