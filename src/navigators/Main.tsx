import React from 'react';
import { LoginScreen, MainScreen, Profile } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstImageScreen from '../components/MainScreen/ FirstImageScreen';
import SecondImageScreen from '../components/MainScreen/SecondImageScreen';
const Stack = createNativeStackNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="FirstImageScreen" component={FirstImageScreen} />
      <Stack.Screen name="SecondImageScreen" component={SecondImageScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
