import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResponsiveAppBar from './src/components/ResponsiveAppBar';



//route imports
import AddNew from './src/Views/AddNew';
import Display from './src/Views/Display';

// 1. Define your stack parameter types
export type RootStackParamList = {
  AddNew: undefined;
  Display: { comic?: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function ContentView() {
  return (
    <NavigationContainer>
      {/* Persistent Top Navigation Bar */}
      <ResponsiveAppBar />

      {/* Screen Routing */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AddNew" component={AddNew} />
        <Stack.Screen name="Display" component={Display} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
