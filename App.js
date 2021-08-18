import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Formik } from 'formik'
import CheckBox from "@react-native-community/checkbox"

export default function App() {
  /**
   * This can either be synchronous or asynchronous. We won't focus on the onSubmit
   * handler but in general it is most likely going to be asynchronous as you submit
   * data to the server.
   */
  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik 
      initialValues={{ 
        firstName: "",
        acceptTerms: true,
      }} 
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, handleChange, handleSubmit }) => {
          return (
            <View style={styles.container}>
              <StatusBar style="auto" />
              <TextInput
                value={values.firstName}
                style={styles.inputStyle}
                onChangeText={handleChange('firstName')}
                placeholder="FirstName"
              />
              <View style={styles.section}>
                <Text style={styles.paragraph}>Custom colored checkbox</Text>
                <CheckBox
                  style={styles.checkbox}
                  value={values?.acceptTerms}
                  onValueChange={v => setFieldValue('acceptTerms', v)}
                  tintColor="#4630EB"
                  onTintColor="#4630EB"
                  onFillColor="#4630EB"
                  onCheckColor="#ffff"
                  //color={values.acceptTerms ? '#4630EB' : undefined}
                />
              </View>
              <Button
                color="#4630EB"
                title='Submit'
                onPress={handleSubmit}
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
  },
  section: {
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
