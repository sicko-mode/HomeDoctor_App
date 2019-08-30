import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { SignUp } from "./Account/signup";

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign Up"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'SignUp'})
              ],
            }))
          }}
        />
     </View> 
    );
  }
}

const AppNavigator = createStackNavigator({
  App: {
    screen: App,
  },
  SignUp: {
    screen: SignUp,
  }, 
}, {
    initialRouteName: 'App',
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default createAppContainer(AppNavigator);