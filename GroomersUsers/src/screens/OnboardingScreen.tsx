import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { colors, typography } from '../theme';
import Button from '../components/Button';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';

const OnboardingScreen = ({ navigation }: any) => {
  return (
    <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
      <View style={styles.slide}>
        <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.image} />
        <Title text="Find Salons" />
        <Subtitle text="Discover the best salons and spas near you." />
      </View>
      <View style={styles.slide}>
        <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.image} />
        <Title text="Book Appointments" />
        <Subtitle text="Easily book appointments anytime, anywhere." />
      </View>
      <View style={styles.slide}>
        <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.image} />
        <Title text="Get Notified" />
        <Subtitle text="Receive reminders and updates about your bookings." />
        <View style={styles.buttonContainer}>
          <Button title="Get Started" onPress={() => navigation.replace('Login')} />
        </View>
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
    backgroundColor: colors.background,
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 40,
    width: '100%',
  },
});

export default OnboardingScreen;
