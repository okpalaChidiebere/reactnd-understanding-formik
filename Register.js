import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { Formik } from 'formik'
import { object, string, ref } from 'yup'

export default function Register(){

    const RegisterValidation = object().shape({
        //For our name validation we'll just specify that it is required.
        name: string()
            .required("Required"),
        /**
         * For our email we'll specify both required and email. We'll change
         *  up the text here and just specify that a valid email is required 
         * regardless.
         */
        email: string()
            .required("Valid email required")
            .email("Valid email required"),
        /**
         * For our password we'll specify a minimum of 8 characters.
         */
        password: string()
            .min(8, "Password should have min of 8 chars.")
            .required("Required"),
        /**
         * Yups way of referencing other fields for comparison is using ref. 
         * This will reference the other field value and can be used in many contexts. 
         * 
         * We use the oneOf option and say that the confirmPassword should be oneOf 
         * a reference. Meaning it should match password. 
         */
        confirmPassword: string()
            .required("Please confirm your password")
            .oneOf([ref("password")], "Passwords do not match"),
    })

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={RegisterValidation}
        >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => {
                return (
                    <View style={styles.container}>
                        <StatusBar style="auto" />
                        <TextInput
                            value={values.name}
                            style={[
                                styles.inputStyle,
                                { borderColor: touched.name && errors.name ? "#FF0D10" : "black" }
                            ]}
                            onChangeText={handleChange('name')}
                            onBlur={() => setFieldTouched('name')}
                            placeholder="Name"
                        />
                        {touched.name && errors.name &&
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.name}</Text>
                        }            
                        <TextInput
                            value={values.email}
                            style={[
                                styles.inputStyle,
                                { borderColor: touched.email && errors.email ? "#FF0D10" : "black" }
                            ]}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            placeholder="Email"
                        />
                        {touched.email && errors.email &&
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
                        }
                        <TextInput
                            value={values.password}
                            style={[
                                styles.inputStyle,
                                { borderColor: touched.password && errors.password ? "#FF0D10" : "black" }
                            ]}
                            onChangeText={handleChange('password')}
                            placeholder="Password"
                            onBlur={() => setFieldTouched('password')}
                            secureTextEntry={true}
                        />
                        {touched.password && errors.password &&
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                        }
                        <TextInput
                            value={values.confirmPassword}
                            style={[
                                styles.inputStyle,
                                { borderColor: touched.confirmPassword && errors.confirmPassword ? "#FF0D10" : "black" }
                            ]}
                            onChangeText={handleChange('confirmPassword')}
                            placeholder="Confirm Password"
                            onBlur={() => setFieldTouched('confirmPassword')}
                            secureTextEntry={true}
                        />
                        {touched.confirmPassword && errors.confirmPassword &&
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.confirmPassword}</Text>
                        }
                        <Button
                            color="#3740FE"
                            title='Register'
                            disabled={!isValid}
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
    },
    inputStyle: {
      borderWidth: 1,
      borderColor: '#4e4e4e',
      padding: 12,
      marginBottom: 5,
    },
})