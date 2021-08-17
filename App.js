import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik'

export default function App() {
  /**
   * This can either be synchronous or asynchronous. We won't focus on the onSubmit
   * handler but in general it is most likely going to be asynchronous as you submit
   * data to the server.
   */
  const handleSubmit = (values) => {}

  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      {() => {
          return (
            <View style={styles.container}>
              <Text>Open up App.js to start working on your app!</Text>
              <StatusBar style="auto" />
            </View>
          )
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
