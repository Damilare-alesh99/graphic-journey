import { AppRegistry } from 'react-native';
import App from './App';

// Register and mount the app for React Native Web
AppRegistry.registerComponent('main', () => App);

const rootTag = document.getElementById('root');
if (rootTag) {
  AppRegistry.runApplication('main', {
    initialProps: {},
    rootTag,
  });
}
