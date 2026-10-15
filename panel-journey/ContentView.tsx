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

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function ContentView() {

  const linking = {
    prefixes: ['https://example.com', 'example://'],
    config: {
      screens: {
        AddNew: 'new',
        Display: 'display/:id',
      },
    },
  };

  return (
    <NavigationContainer
      linking={linking}>
      {/* Persistent Top Navigation Bar */}
      <ResponsiveAppBar />

      {/* Screen Routing */}
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="AddNew" component={AddNew} />
        <RootStack.Screen name="Display" component={Display} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
