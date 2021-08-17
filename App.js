import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Formik } from 'formik'

export default function App() {
  /**
   * This can either be synchronous or asynchronous. We won't focus on the onSubmit
   * handler but in general it is most likely going to be asynchronous as you submit
   * data to the server.
   */
  const handleSubmit = (values) => {}

  return (
    <Formik 
      initialValues={{ 
        firstName: "",
      }} 
      onSubmit={handleSubmit}
    >
      {({ values, handleChange }) => {
          return (
            <View style={styles.container}>
              <StatusBar style="auto" />
              <TextInput
                value={values.firstName}
                style={styles.inputStyle}
                onChangeText={handleChange('firstName')}
                placeholder="FirstName"
              />
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
    padding: 50,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#4e4e4e',
    padding: 12,
    marginBottom: 5,
  }
});
