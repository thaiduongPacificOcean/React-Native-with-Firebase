import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'
import { db, auth, createUserWithEmailAndPassword } from '../../firebaseConfig'
import { addDoc, collection, setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native'

const signUpForm = () => {
    const navigation = useNavigation();
    const signupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('A email is required'),
        username: Yup.string().required().min(2, 'Tên người dùng quá ngắn'),
        password: Yup.string().required().min(8, 'Mật khẩu phải hơn 8 ký tự')
    })
    const defaultAvatarUser = 'https://yesgooddog.co.uk/wp-content/uploads/2020/06/yes-good-dog-paw-print-icon.png';

    // function Sign Up
    const onSignUp = async (email, username, password, fullname) => {
        try {
            const authUser = await createUserWithEmailAndPassword(auth, email, password)
            console.log('✅ Firebase Đăng ký thành công \n', '\n Email: ' + email, '\n Password: ' + password, '\n Username:' + username, '\n Fullname:' + fullname)
            const usersCollection = collection(db, 'users')
            const newUser = {
                owner_userid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: defaultAvatarUser,
                fullname: fullname,
                describe: '',
                follower: [],
                following: [],
                pets: [],
                timestamp: Timestamp.now(),
            };
            const userDocRef = doc(usersCollection, authUser.user.uid);
            const docRef = await setDoc(userDocRef, newUser);
            navigation.navigate("LoginScreen");
            console.log("Document written with ID: ", email);
        } catch (e) {
            Alert.alert(
                '🔔 Thông báo:', 'Email đã được đăng ký tài khoản rồi, bạn có thể đăng ký bằng email khác hoặc đăng nhập nếu đã có tài khoản',
                [{
                    text: 'OK',
                    onPress: () => console.log('OK'),
                    style: 'cancel',
                },
                {
                    text: 'Đăng nhập',
                    onPress: () => navigation.push('LoginScreen'),
                }]
            )
        }
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', password: '', username: '', fullname: '' }}
                onSubmit={values => {
                    onSignUp(values.email, values.username, values.password, values.fullname)
                }}
                validationSchema={signupFormSchema}
                validateOnMount={true}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) =>
                    <>
                        <View style={[styles.inputField,
                        {
                            borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
                        }
                        ]}>
                            <TextInput placeholder='Email'
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
                            borderColor: 1 > values.username.length || values.username.length > 4 ? '#ccc' : 'red'
                        }
                        ]}>
                            <TextInput placeholder='Username'
                                autoCapitalize='none'
                                textContentType='username'
                                autoFocus={false}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
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
                        <View style={[styles.inputField,
                        {
                            borderColor: 1 > values.fullname.length || values.fullname.length > 4 ? '#ccc' : 'red'
                        }
                        ]}>
                            <TextInput placeholder='Tên đầy đủ'
                                autoCapitalize='none'
                                textContentType='username'
                                autoFocus={false}
                                onChangeText={handleChange('fullname')}
                                onBlur={handleBlur('fullname')}
                                value={values.fullname}
                            />
                        </View>

                        <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>

                        </View>
                        <Pressable style={styles.button(isValid)}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Đăng ký</Text>
                        </Pressable>
                        <View style={styles.signupContainer}>
                            <Text>Nếu bạn đã có tài khoản?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                                <Text style={{ color: '#FF6347' }}> Đăng nhập tại đây</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </Formik>
        </View>
    )
}

export default signUpForm

const styles = StyleSheet.create({
    inputField: {
        backgroundColor: '#FAFAFA',
        borderWidth: 0.25,
        borderRadius: 1,
        padding: 10,
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
        fontSize: 15,
        fontWeight: '600'
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 50,
        width: '100%'
    },
})