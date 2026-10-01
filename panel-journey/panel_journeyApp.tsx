import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ContentView from './ContentView';

export default function PanelJourneyApp() {
  return (
    <>
      <StatusBar style="auto" />
      <ContentView />
    </>
  );
}
