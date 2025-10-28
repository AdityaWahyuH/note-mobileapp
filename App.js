import { GlobalContextProvider } from './context/context';
import React from 'react';
import useNotifications from './Notifications/useNotifications';
import AppNavigator from './AppNavigator';
import { View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Conditional import untuk Snackbar
let Snackbar;
if (Platform.OS !== 'web') {
  // Hanya import di Android/iOS
  const SnackbarModule = require('@ouroboros/react-native-snackbar');
  Snackbar = SnackbarModule.Snackbar;
}

export default function App() {
  const navRef = useNotifications();
  
  return (
    <GlobalContextProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style='dark' />
        <AppNavigator navRef={navRef} />

        {/* Hanya render Snackbar di Android/iOS, skip di web */}
        {Platform.OS !== 'web' && Snackbar && (
          <Snackbar 
            actionStyle={{ color: "lightgreen" }} 
            textStyle={{ color: "#bbb" }}
            messageStyle={{ 
              paddingVertical: 15, 
              paddingHorizontal: 10, 
              borderRadius: 3, 
              backgroundColor: "black" 
            }}
          />
        )}
      </View>
    </GlobalContextProvider>
  );
}
