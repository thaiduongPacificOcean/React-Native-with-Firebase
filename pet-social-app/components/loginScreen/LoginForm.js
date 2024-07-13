import { View, Text, TextInput, Button, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'
import { db, auth, signInWithEmailAndPassword } from '../../firebaseConfig'
import { useNavigation } from '@react-navigation/native'

const LoginForm = () => {
    const navigation = useNavigation();

    const loginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('A email is required'),
        password: Yup.string().required().min(8, 'Mật khẩu phải hơn 8 ký tự')
    })
    // function Login
    const onLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log('✅ Firebase login success \n', '\n Email: ' + email, '\n Password: ' + password)
        }
        catch (e) {
            Alert.alert(
                '🔔 Thông báo:', 'Email hoặc mật khẩu không đúng, bạn có thể đăng nhập lại tài khoản hoặc đăng ký tài khoản mới',
                [{
                    text: 'OK',
                    onPress: () => console.log('OK'),
                    style: 'cancel',
                },
                {
                    text: 'Đăng ký',
                    onPress: () => navigation.push('SignUpScreen'),
                }]
            )
        }
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {
                    onLogin(values.email, values.password)
                }}
                validationSchema={loginFormSchema}
                validateOnMount={true}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) =>
                    <>
                        <View style={[styles.inputField,
                        {
                            borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
                        }
                        ]}>
                            <TextInput placeholder='Phone number, Username or email '
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={false}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View style={[styles.inputField,
                        {
                            borderColor: 1 > values.password.length || values.password.length >= 7 ? '#ccc' : 'red'
                        }
                        ]}>
                            <TextInput placeholder='Mật khẩu'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        {/* <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
                            <Text style={{ color: '#FF6347' }}>Qun ? </Text>
                        </View> */}
                        <Pressable style={styles.button(isValid)}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Đăng nhập</Text>
                        </Pressable>
                        <View style={styles.signupContainer}>
                            <Text>Nếu bạn chưa có tài khoản?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                                <Text style={{ color: '#FF6347' }}> Đăng ký tại đây</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </Formik>
        </View>
    )
}

export default LoginForm

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 60
    },
    inputField: {
        backgroundColor: '#FAFAFA',
        borderWidth: 0.25,
        borderRadius: 1,
        padding: 12,
        marginBottom: 10
    },
    button: isValid => ({
        backgroundColor: isValid ? '#FF6347' : '#FFA07A',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        minHeight: 42,
        borderRadius: 4,
    }),
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 50,
        width: '100%'
    },
})