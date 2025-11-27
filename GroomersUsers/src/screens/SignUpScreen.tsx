import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../state/AuthContext';
import Container from '../components/Container';
import Title from '../components/Title';
import Input from '../components/Input';
import Button from '../components/Button';
import { colors } from '../theme';

const SignUpScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register } = useAuth();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Sign-Up Failed', 'Please fill in all fields.');
      return;
    }
    try {
      await register({ name, email, password });
      Alert.alert('Sign-Up Successful', `Welcome, ${name}!`);
      navigation.navigate('Login');
    } catch (e: any) {
      Alert.alert('Sign-Up Failed', e?.message || 'Unexpected error');
    }
  };

  return (
    <Container>
      <Title text="Create an Account" />
      <Input
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.spacer20} />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.spacer20} />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.spacer40} />
      <Button title="Sign Up" onPress={handleSignUp} />
      <View style={styles.spacer20} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  loginText: {
    textAlign: 'center',
    color: colors.secondary,
    fontSize: 16,
  },
  spacer20: {
    height: 20,
  },
  spacer40: {
    height: 40,
  },
});

export default SignUpScreen;
