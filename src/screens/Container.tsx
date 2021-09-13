import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import AnimeListScreen from './AnimeListScreen';
import FavoriteAnimeListScreen from './FavoriteAnimeListScreen';

export type Routes = {
  ProfileScreen: undefined;
  AnimeListScreen: undefined;
  FavoriteAnimeListScreen: undefined;
};
const Stack = createNativeStackNavigator<Routes>();

const Container: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="AnimeListScreen"
        component={AnimeListScreen}
        options={{title: 'Animes'}}
      />
      <Stack.Screen
        name="FavoriteAnimeListScreen"
        component={FavoriteAnimeListScreen}
        options={{title: 'Favorites Animes'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Container;
