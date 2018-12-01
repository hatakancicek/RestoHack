import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import NoUser from './Containers/NoUser';
import firebase from 'firebase';
import Config from './Config';
import Loading from './Screens/Loading';

firebase.initializeApp(Config);

export default class App extends React.Component {
  state = {
    showLoading: true,
  };

  updateUser = user => {
    this.setState({
      user,
    });
  };

  componentDidMount() {
    const { updateUser } = this;
    firebase.auth().onAuthStateChanged(updateUser)
  };

  componentDidUpdate(prevState) {
    const { user } = prevState;

    if(user === undefined) {
      if(this.state.user !== undefined && this.refs.loading) {
        this.refs.loading.hide();
        setTimeout(_ => this.setState({showLoading: false}), 1250)
      }
    }
  }

  render() {
    const { showLoading } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <NoUser />
        {showLoading && <Loading ref="loading" />}
      </SafeAreaView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  text: {
    fontSize: 330,
    color: 'white',
  },
});
