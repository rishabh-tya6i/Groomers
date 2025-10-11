
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import api from '../services/api';

const VendorRegistrationScreen = ({ navigation }) => {
  // User fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Salon fields
  const [salonName, setSalonName] = useState('');
  const [salonDescription, setSalonDescription] = useState('');
  const [salonCity, setSalonCity] = useState('');
  const [salonContactPhone, setSalonContactPhone] = useState('');
  const [salonContactEmail, setSalonContactEmail] = useState('');
  const [salonImageUrl, setSalonImageUrl] = useState('');

  const handleRegister = async () => {
    try {
      const response = await api.post('/auth/vendor/signup', {
        fullName,
        email,
        password,
        phone,
        salonName,
        salonDescription,
        salonCity,
        salonContactPhone,
        salonContactEmail,
        salonImageUrl,
      });
      console.log(response.data);
      Alert.alert('Registration Successful', 'Your salon has been registered. Please add your services.');
      navigation.navigate('ServiceManagement', { isFirstService: true });
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error('Error', error.message);
      }
      Alert.alert('Registration Failed', 'Please check your details and try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vendor Registration</Text>

      <Text style={styles.subtitle}>Your Details</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text style={styles.subtitle}>Salon Details</Text>
      <TextInput style={styles.input} placeholder="Salon Name" value={salonName} onChangeText={setSalonName} />
      <TextInput style={styles.input} placeholder="Salon Description" value={salonDescription} onChangeText={setSalonDescription} />
      <TextInput style={styles.input} placeholder="Salon City" value={salonCity} onChangeText={setSalonCity} />
      <TextInput style={styles.input} placeholder="Salon Contact Phone" value={salonContactPhone} onChangeText={setSalonContactPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Salon Contact Email" value={salonContactEmail} onChangeText={setSalonContactEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Salon Image URL" value={salonImageUrl} onChangeText={setSalonImageUrl} />

      <Button title="Register" onPress={handleRegister} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default VendorRegistrationScreen;
