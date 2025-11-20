import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { createAppointment } from '../api/appointments';
import { useAuth } from '../state/AuthContext';

const BookingScreen = ({ route }: any) => {
  const { salon, services } = route.params;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [serviceId, setServiceId] = useState<number | null>(services?.[0]?.id ?? null);
  const { token } = useAuth();

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  ];

  const toIsoOffset = (dateStr: string, timeStr: string) => {
    const [hourMin, meridiem] = timeStr.split(' ');
    const [hStr, mStr] = hourMin.split(':');
    let h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (meridiem.toUpperCase() === 'PM' && h !== 12) h += 12;
    if (meridiem.toUpperCase() === 'AM' && h === 12) h = 0;
    const date = new Date(`${dateStr}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
  };

  const handleBooking = async () => {
    if (!token) {
      Alert.alert('Login required', 'Please login to book an appointment.');
      return;
    }
    if (selectedDate && selectedTime && customerName && customerContact && serviceId) {
      try {
        const startTime = toIsoOffset(selectedDate, selectedTime);
        await createAppointment({ salonId: salon.id, serviceId, startTime, slotId: null });
        Alert.alert('Booking confirmed', `${customerName} on ${selectedDate} at ${selectedTime}`);
      } catch (e: any) {
        Alert.alert('Booking failed', e?.message || 'Unexpected error');
      }
    } else {
      Alert.alert('Incomplete', 'Please fill all fields');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.salonName}>{salon.name}</Text>
      
      <Text style={styles.title}>Select Date</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#007BFF' },
        }}
        style={styles.calendar}
      />
      
      <Text style={styles.title}>Select Time</Text>
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeSlot,
              selectedTime === time && styles.selectedTimeSlot,
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text
              style={[
                styles.timeSlotText,
                selectedTime === time && styles.selectedTimeSlotText,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.title}>Select Service</Text>
      <View style={styles.timeSlotsContainer}>
        {services?.map((svc: any) => (
          <TouchableOpacity
            key={svc.id}
            style={[styles.timeSlot, serviceId === svc.id && styles.selectedTimeSlot]}
            onPress={() => setServiceId(svc.id)}
          >
            <Text style={[styles.timeSlotText, serviceId === svc.id && styles.selectedTimeSlotText]}>
              {svc.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>Your Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={customerName}
        onChangeText={setCustomerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={customerContact}
        onChangeText={setCustomerContact}
        keyboardType="phone-pad"
      />
      
      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  salonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  calendar: {
    borderRadius: 8,
    marginBottom: 16,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '23%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedTimeSlot: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  timeSlotText: {
    fontSize: 14,
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
