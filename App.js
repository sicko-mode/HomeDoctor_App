import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

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
     </View> 
    );
  }
}

class SignUp extends Component {
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, email, phone_number } = this.state
    try {
      // here place your signup logic
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }
 
  render() {
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
        <TextInput
          style={styles_signup.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='#42A5F5'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles_signup.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='#42A5F5'
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <Button
          title='Sign Up'
          onPress={this.signUp}
        />
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: App,
  },
  SIGNUP: {
    screen: SignUp,
  },
}, {
    initialRouteName: 'Home',
});


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
    flex: 1,
    backgroundColor: '#42A5F5',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default createAppContainer(AppNavigator);