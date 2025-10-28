import { GlobalContextProvider } from './context/context';
import React from 'react';
import useNotifications from './Notifications/useNotifications';
import AppNavigator from './AppNavigator';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const navRef = useNotifications();
  
  return (
    <PaperProvider>
      <GlobalContextProvider>
        <View style={{ flex: 1 }}>
          <StatusBar style='dark' />
          <AppNavigator navRef={navRef} />
        </View>
      </GlobalContextProvider>
    </PaperProvider>
  );
}
