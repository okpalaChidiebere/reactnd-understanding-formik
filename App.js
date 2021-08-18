import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Formik } from 'formik'
import CheckBox from "@react-native-community/checkbox"
import { RadioButton } from "react-native-paper"

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
        color: "",
      }} 
      onSubmit={handleSubmit}
      /**
       * Form requirements can range from very simple, to very complex. 
       * We use this validate method to handle the basic form
       */
      validate={(values) => {
        let errors = {}

        //we check if firstName is empty and if it is we set an error message
        if (!values.firstName) {
          errors.firstName = "Required"
        }
        return errors
      }}
    >
      {({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
          return (
            <View style={styles.container}>
              <StatusBar style="auto" />
              <TextInput
                value={values.firstName}
                style={styles.inputStyle}
                onChangeText={handleChange('firstName')}
                placeholder="FirstName"
              />
              {errors.firstName &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.firstName}</Text>
              }  
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
              <View>
                <RadioButton.Group
                  onValueChange={v => setFieldValue('color', v)}
                  value={values?.color}
                >
                  <View style={styles.section}>
                    <Text>First</Text>
                    <RadioButton
                      value="blue"
                      color="#4630EB"
                      uncheckedColor="black" /**only works in android :( */
                      status={ values?.color === 'blue' ? 'checked' : 'unchecked' }
                      onPress={() => setFieldValue('color', 'blue')}
                    />
                  </View>
                  <View style={styles.section}>
                    <Text>Red</Text>
                    <RadioButton
                      value="red"
                      onPress={() => setFieldValue('color', 'red')}
                    />
                  </View>
                  <View style={styles.section}>
                  <Text>Green</Text>
                    <RadioButton
                      value="green"
                      onPress={() => setFieldValue('color', 'green')}
                    />
                  </View>
                </RadioButton.Group>
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
