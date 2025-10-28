import { createContext, useContext, useEffect, useState } from "react";
import { getData } from "../utils/storage";
import React from 'react';
import { Snackbar } from 'react-native-paper';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [labels, setLabels] = useState([]);
  
  // State untuk Snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchLocalStorageData = async () => {
      const notes = await getData("notes");
      if (notes) setNotes(notes);
      const labels = await getData("labels");
      if (labels) setLabels(labels);
    }
    fetchLocalStorageData();
  }, []);

  // Function untuk show snackbar
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  // Function untuk hide snackbar
  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  return (
    <GlobalContext.Provider 
      value={{ 
        notes, 
        setNotes, 
        labels, 
        setLabels,
        showSnackbar,
        hideSnackbar
      }}
    >
      {children}
      
      {/* Snackbar Component */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={hideSnackbar}
        duration={3000}
        style={{ 
          backgroundColor: 'black',
          marginBottom: 10,
          borderRadius: 3
        }}
        action={{
          label: 'OK',
          onPress: hideSnackbar,
          labelStyle: { color: 'lightgreen' }
        }}
        wrapperStyle={{
          bottom: 0
        }}
      >
        <span style={{ color: '#bbb' }}>{snackbarMessage}</span>
      </Snackbar>
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within GlobalContextProvider');
  }
  return context;
}
