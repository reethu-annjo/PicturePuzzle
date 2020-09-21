import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import React, {Component} from 'react';
import PuzzleImageScreen from './PicturePuzzleScreen';

class AppNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppStackScreen />
      </NavigationContainer>
    );
  }
}

const AppStack = createStackNavigator();
const AppStackScreen = () => (
  <AppStack.Navigator
    headerMode="screen"
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <AppStack.Screen name={'PuzzleImageScreen'} component={PuzzleImageScreen} />
  </AppStack.Navigator>
);

export default AppNavigation;
