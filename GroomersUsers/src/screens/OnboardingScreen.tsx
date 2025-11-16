
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const OnboardingScreen = ({ navigation }) => {
  return (
    <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
      <View style={styles.slide}>
        <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.image} />
        <Text style={styles.title}>Find Salons</Text>
        <Text style={styles.text}>Discover the best salons and spas near you.</Text>
      </View>
      <View style={styles.slide}>
        <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.image} />
        <Text style={styles.title}>Book Appointments</Text>
        <Text style={styles.text}>Easily book appointments anytime, anywhere.</Text>
      </View>
      <View style={styles.slide}>
        <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.image} />
        <Text style={styles.title}>Get Notified</Text>
        <Text style={styles.text}>Receive reminders and updates about your bookings.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
