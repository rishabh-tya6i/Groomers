
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import api from '../services/api';
import { useSalon } from '../context/SalonContext';

const AppointmentListScreen = () => {
  const { salon } = useSalon();
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    if (!salon) return;
    try {
      const response = await api.get(`/salons/${salon.id}/appointments`);
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch appointments.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [salon]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Requests</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.appointmentItem}>
            <Text>Customer: {item.customer.fullName}</Text>
            <Text>Service: {item.service.name}</Text>
            <Text>Time: {new Date(item.startTime).toLocaleString()}</Text>
            <View style={styles.buttons}>
              <Button title="Accept" onPress={() => {}} />
              <Button title="Decline" color="red" onPress={() => {}} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  appointmentItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
});

export default AppointmentListScreen;
