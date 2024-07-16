import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const isUserLogin = await auth().signInWithEmailAndPassword(email, password);
        setMessage('');
        console.log(isUserLogin);

        navigation.navigate('Home', {
          email: isUserLogin.user.email,
          uid: isUserLogin.user.uid,
        });
      } else {
        Alert.alert('Missing Information', 'Please fill in all required fields.');
      }
    } catch (err) {
      console.log('Error code:', err.code);
      console.log(err);

      setMessage(err.message);
      switch (err.code) {
        case 'auth/wrong-password':
          Alert.alert('Invalid Credentials', 'You entered a wrong password.');
          break;
        case 'auth/user-not-found':
          Alert.alert('Invalid Credentials', 'You entered a wrong email.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Invalid Credentials', 'You entered an invalid email.');
          break;
        case 'auth/invalid-credential':
          Alert.alert('Invalid Credentials', 'You entered wrong email or password.');
          break;
      }
    }
  };

  return (
    <>
      <View>
        <Image
          source={{ uri: 'loginpage' }}
          style={{ width: 420, height: 400, marginBottom: 40 }} // Set width and height as needed
        />
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <StatusBar hidden={true} />
        <View>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'black' }}>
            Login
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Your Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Your Password"
            placeholderTextColor="black"
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleLogin}
          >
            <Text style={{ color: '#fff' }}>Login</Text>
          </TouchableOpacity>
          <Text>{message}</Text>
          <TouchableOpacity
            style={styles.signup}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <Text style={{ color: 'blue' }}>New User Signup?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 130,
  },
  inputBox: {
    width: width - 30,
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
    height: 50,
    color: 'black',
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  signup: {
    alignItems: 'center',
  },
});
