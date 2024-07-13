import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const OnboardingScreen = () => {

  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('SignInScreen');
  }
  return (
    <View style= {styles.container}>
      <Onboarding
        onSkip={handleDone}
        showDone={false}
        bottomBarHighlight= {false}
        pages={[
          {
            backgroundColor: '#a78bfa',
            image: (
              <View style={styles.lottie}>
                <Lottie source={require('../assets/animations/Lottie1.json')} autoPlay loop />
              </View>
            ),
            title: 'John in our Animal Community',
            subtitle: 'Share your pet life with your friend',
          },
          {
            backgroundColor: '#fef3c7', 
            image: (
              <View style={styles.lottie}>
                <Lottie source={require('../assets/animations/Lottie4.json')} autoPlay loop />
              </View>
            ),
            title: 'Share your pet profile',
            subtitle: 'Create a profile, share stories and pictures',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View>
                <View style={styles.lottie}>
                  <Lottie source={require('../assets/animations/Lottie3.json')} autoPlay loop />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                  <View style={styles.registerConatinerEmail}>
                    <View style={styles.iconViewEmail}>
                      <Ionicons name="mail" size={20} color="#3399BB" style={styles.icon}/>
                    </View>
                    <Text style={styles.registerText}>Đăng ký với Email</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.orContainer}>
                  <Text style={styles.orText}>Hoặc</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                  <View style={styles.registerConatinerGoogle}>
                    <View style={styles.iconViewGoogle}>
                      <Ionicons name="logo-google" size={20} color="#FF9933" style={styles.icon}/>
                    </View>
                    <Text style={styles.registerText}>Đăng nhập bằng Google</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.registerConatinerFacebook}>
                    <View style={styles.iconViewFacebook}>
                      <Ionicons name="logo-facebook" size={20} color="#0066CC" style={styles.icon}/>
                    </View>
                    <Text style={styles.registerText}>Đăng nhập bằng Facebook</Text>
                  </View>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', paddingTop: 10, justifyContent: 'center'}}>
                  <Text style={{color: '#222'}}>Nếu như bạn đã có tài khoản ? </Text> 
                  <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={{color: 'black', fontWeight: '500'}}>Đăng nhập tại đây</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
            title: '',
            subtitle: '',
          },
        ]}
    />
    </View>
  )
}
export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    height: 300,
    width: 300,
    marginVertical: 60,
    // flex : 1
  },
  registerConatinerEmail: {
    padding: 10,
    backgroundColor: '#3399BB',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  registerConatinerGoogle: {
    padding: 10,
    backgroundColor: '#FF9933',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  registerConatinerFacebook: {
    padding: 10,
    backgroundColor: '#0066CC',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  registerText: {
    fontWeight: '500',
    fontSize: 15,
    color: 'white',
    paddingLeft: 10,
    fontFamily: ''
  },
  iconViewGoogle: {
    backgroundColor: 'white',
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  iconViewEmail: {
    backgroundColor: 'white',
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  iconViewFacebook: {
    backgroundColor: 'white',
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  icon: {
  },
  orContainer: {
    justifyContentL: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  orText : {
    color: '#222',
  }
})