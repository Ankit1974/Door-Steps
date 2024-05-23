import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      if(email.length > 0 && password.length > 0){
        if (!validateEmail(email)) {
          alert('Invalid Email', 'Please enter a valid email address.');
          return;
        }
        if(!validatePassword(password)){
          alert('Short Password' , 'Password should be at least 6 characters');
          return;
        }
      const isUserCreated = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(isUserCreated);

      navigation.navigate('Login');
    }else{
      alert('Missing Information', 'Please fill in all required fields.')
    }

     
    } catch (err) {
      console.log(err);

      setMessage(err.message);
    }
  };
  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // Normal length of Password  
    return password.length >= 6;
  };

  return (
      <><View>
      <Image
        source={{ uri: 'loginpage' }}
        style={{ width: 420, height: 400, marginBottom: 40 }} // Set width and height as needed
      />
    </View><View style={styles.container}>
        <StatusBar hidden={true} />
        <View>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' , color:'black' }}>
            Register Your Account
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Your Email"
            value={email}
            onChangeText={value => setEmail(value)} />
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Your Password"
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry={true} />

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleSignup()}>
            <Text style={{ color: '#fff' }}>Signup</Text>
          </TouchableOpacity>

          <Text>{message}</Text>

          <TouchableOpacity
            style={styles.signup}
            onPress={() => {
              navigation.navigate('Login');
            } }>
            <Text style={{ color: 'blue' }}>Already Have An Account ?</Text>
          </TouchableOpacity>
        </View>
      </View></>
  );
}

const { width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 130
  },
  inputBox: {
    width: width - 30,
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
    height:50,
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