import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { Formik } from 'formik'
import { object, string } from 'yup'

export default function Login(){

    const LoginValidation = object().shape({
        email: string()
            .required("Required")
            .email("Valid email required"),
        /** Now looking at password structure it will need to be a string. 
         * With a minimum of 8 characters and also required. */
        password: string()
            .min(4, "Password should have min of 8 chars.")
            .max(10, 'Password should not excced 10 chars.')
            .required("Required"),
    })

    const handleSubmit = (values) => {
        console.log(values)
    }


    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={LoginValidation}
        >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => {
                return (
                    <View style={styles.container}>
                        <StatusBar style="auto" />
                        <TextInput
                            value={values.email}
                            style={[
                                styles.inputStyle, 
                                /**
                                 * For toggling our border when an error happens we check error and touched. 
                                 * Then set the inputs border color to red so the user knows there is an error.
                                 */
                                { borderColor: touched.email && errors.email ? "#FF0D10" : "black" }
                            ]}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            placeholder="E-mail"
                        />
                        {touched.email && errors.email &&
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
                        }
                        <TextInput
                            value={values.password}
                            style={[styles.inputStyle, { borderColor: touched.password && errors.password ? "#FF0D10" : "black" }]}
                            onChangeText={handleChange('password')}
                            placeholder="Password"
                            onBlur={() => setFieldTouched('password')}
                            secureTextEntry={true}
                        />
                        {touched.password && errors.password &&
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                        }
                        <Button
                            color="#3740FE"
                            title='Sign In'
                            disabled={!isValid} /** we disable the submit buttons until we have valid inputs */
                            onPress={handleSubmit}
                        />
                    </View>
                )
            }}
        </Formik>
    )
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
})
  