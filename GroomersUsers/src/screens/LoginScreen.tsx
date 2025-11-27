import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../state/AuthContext';
import Container from '../components/Container';
import Title from '../components/Title';
import Input from '../components/Input';
import Button from '../components/Button';
import { colors } from '../theme';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login Failed', 'Please enter both email and password.');
      return;
    }
    try {
      await login({ email, password });
      navigation.navigate('Main');
    } catch (e: any) {
      Alert.alert('Login Failed', e?.message || 'Unexpected error');
    }
  };

  return (
    <Container>
      <Title text="Welcome Back!" />
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
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.spacer20} />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  signUpText: {
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

export default LoginScreen;
