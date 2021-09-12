import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';

export type Routes = {
  ProfileScreen: undefined;
};
const Stack = createNativeStackNavigator<Routes>();

const Container: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Container;
