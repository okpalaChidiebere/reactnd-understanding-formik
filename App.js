import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Formik, useField } from 'formik'
import * as yup from 'yup'
import CheckBox from "@react-native-community/checkbox"
import { RadioButton } from "react-native-paper"

const MySpecialField = () => {
  /**
   * Formik doesn't work with just normal form fields, you can build and 
   * interpret any value that you've stored on the values. Everything is 
   * stored in memory so when developing custom fields you can do anything 
   * you want.
   * 
   * From here you can take your component in any direction you want. 
   * You have access to all the meta fields to display errors, and do 
   * whatever you need to for your custom components.
   */
  const [field, meta, helpers] = useField("firstName")

  return (
    <TextInput
      value={meta.value}
      style={[
        styles.inputStyle, 
        { borderColor: meta.touched && meta.error ? "#FF0D10" : "black" }
      ]}
      onBlur={() => helpers.setTouched(true)}
      onChangeText={text => helpers.setValue(text)}
      placeholder="FirstName"
    />
  )
}

export default function App() {

  const NameValidation = yup.object().shape({
    //We describe the shape of our data using the keys that map to the keys on our values
    firstName: yup.string().required("Required"), //specify that firstName is a string() and that it is required()
  })
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
      /*validate={(values) => {
        let errors = {}

        //we check if firstName is empty and if it is we set an error message
        if (!values.firstName) {
          errors.firstName = "Required"
        }
        return errors
      }}*/
      validationSchema={NameValidation}
    >
      {({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
          return (
            <View style={styles.container}>
              <StatusBar style="auto" />
              <MySpecialField />
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
