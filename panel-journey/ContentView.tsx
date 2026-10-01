import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import AddNew from './Views/AddNew';
import Display from './Views/Display';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AddNewStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddNew"
        component={AddNew}
        options={{ title: 'Add New' }}
      />
      <Stack.Screen
        name="Display"
        component={Display}
        options={{ title: 'Display' }}
      />
    </Stack.Navigator>
  );
}

export default function ContentView() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="AddNewTab"
          component={AddNewStack}
          options={{
            tabBarLabel: 'Add New',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size, fontWeight: 'bold' }}>
                +
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
