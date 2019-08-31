import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { fromLeft, fromTop, fromRight, fromBottom, zoomOut } from 'react-navigation-transitions'
import io from 'socket.io-client'
import { RTCPeerConnection, RTCMediaStream, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStreamTrack, getUserMedia } from 'react-native-webrtc';


const socket = io.connect(
  'http://192.168.10.155:4443',
  { transports: ['websocket'] }
);

class App extends Component {
  render() {
    return (
      <View style={styles_main.container}>
        <Button
          title="Sign Up"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'SIGNUP' })
              ],
            }))
          }}
        />
        <Button
          title="Sign In"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'SIGNIN' })
              ],
            }))
          }}
        />
     </View> 
    );
  }
}

class SignUp extends Component {
  state = {
    username: '', password: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password } = this.state
    let success;
    try {
      console.log(this.state.username)
      if (username != '' && password != '') {
         success = "SUCCESS";
      }
      console.log('user successfully signed up!:', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }
 
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles_signup.container}>
        <TextInput
          style={styles_signup.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='#42A5F5'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles_signup.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='#42A5F5'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Button
          title='Sign Up'
          onPress={this.signUp}
        />
      </View>
    )
  }
}

class SignIn extends Component {
  state = {
    username: '', password: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signIn = async () => {
    const { username, password } = this.state
    let success;
    try {
      console.log(this.state.username)
      if (username != '' && password != '') {
         success = "SUCCESS";
      }
      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'MED_SEL' })
        ],
      }))
      console.log('user successfully signed in!:', success)
    } catch (err) {
      console.log('error signing in: ', err)
    }
  }
  render() {
    return (
      <View style={styles_signin.container}>
        <TextInput
          style={styles_signin.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='#42A5F5'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles_signin.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='#42A5F5'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Button
          title='Sign In'
          onPress={this.signIn}
        />
      </View>
    )
  }
}

class MedicSelect extends Component {
  render() {
    const items = [
      { name: '내과', code: '#1abc9c' },
      { name: '산부인과', code: '#3498db' },
      { name: '소아청소년과', code: '#34495e' },
      { name: '안과', code: '#27ae60' },
      { name: '외과', code: '#8e44ad' },
      { name: '이비인후과', code: '#f1c40f' },
      { name: '정신건강의학과', code: '#e74c3c' },
      { name: '정형외과', code: '#95a5a6' },
      { name: '피부과', code: '#d35400' }
    ];

    return (
      <FlatGrid
        itemDimension={130}
        items={items}
        style={styles_grid.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({ item, index }) => (
          <View style={[styles_grid.itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles_grid.itemName}>{item.name}</Text>
          </View>
        )}
      />
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: App,
  },
  SIGNUP: {
    screen: SignUp,
  },
  SIGNIN: {
    screen: SignIn,
  },
  MED_SEL: {
    screen: MedicSelect
  },
}, {
    initialRouteName: 'Home',
    transitionConfig: () => fromLeft(),
  },
);


const styles_main = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const styles_signup = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor:'#FFFFFF',
    margin: 10,
    padding: 8,
    color: '#42A5F5',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 2,
    backgroundColor: '#42A5F5',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const styles_signin = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor:'#FFFFFF',
    margin: 10,
    padding: 8,
    color: '#42A5F5',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 2,
    backgroundColor: '#42A5F5',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const styles_grid = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '600',
  },
});

export default createAppContainer(AppNavigator);