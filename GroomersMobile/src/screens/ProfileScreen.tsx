
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useSalon } from '../context/SalonContext';

const ProfileScreen = () => {
  const { salon, setSalon } = useSalon();

  if (!salon) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Salon Profile</Text>
      <TextInput style={styles.input} placeholder="Salon Name" value={salon.name} onChangeText={(text) => setSalon({ ...salon, name: text })} />
      <TextInput style={styles.input} placeholder="Description" value={salon.description} onChangeText={(text) => setSalon({ ...salon, description: text })} />
      <TextInput style={styles.input} placeholder="City" value={salon.city} onChangeText={(text) => setSalon({ ...salon, city: text })} />
      <TextInput style={styles.input} placeholder="Contact Phone" value={salon.contactPhone} onChangeText={(text) => setSalon({ ...salon, contactPhone: text })} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Contact Email" value={salon.contactEmail} onChangeText={(text) => setSalon({ ...salon, contactEmail: text })} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Image URL" value={salon.imageUrl} onChangeText={(text) => setSalon({ ...salon, imageUrl: text })} />
      <Button title="Save Changes" onPress={() => { /* TODO: Implement save logic */ }} />
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ProfileScreen;
