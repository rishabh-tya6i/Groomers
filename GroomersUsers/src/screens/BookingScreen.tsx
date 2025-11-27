import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { createAppointment } from '../api/appointments';
import { setAuthToken } from '../api/client';
import { useAuth } from '../state/AuthContext';
import Container from '../components/Container';
import Title from '../components/Title';
import Button from '../components/Button';
import TimeSlot from '../components/TimeSlot';
import Input from '../components/Input';
import { colors, typography } from '../theme';

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
        setAuthToken(token);
        const startTime = toIsoOffset(selectedDate, selectedTime);
        await createAppointment({ salonId: salon.id, serviceId, startTime, slotId: null });
        Alert.alert('Booking confirmed', `${customerName} on ${selectedDate} at ${selectedTime}`);
      } catch (e: any) {
        let errorMessage = e?.message || 'Unexpected error';
        try {
          const errorObj = JSON.parse(errorMessage);
          if (errorObj.message) errorMessage = errorObj.message;
        } catch (parseError) {
          // ignore, use original string
        }
        Alert.alert('Booking failed', errorMessage);
      }
    } else {
      Alert.alert('Incomplete', 'Please fill all fields');
    }
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title text={salon.name} />

        <Text style={styles.title}>Select Date</Text>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: colors.primary },
          }}
          style={styles.calendar}
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            textSectionTitleColor: colors.primary,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: colors.white,
            todayTextColor: colors.secondary,
            dayTextColor: colors.text,
            textDisabledColor: colors.gray,
            arrowColor: colors.primary,
            monthTextColor: colors.primary,
            indicatorColor: colors.primary,
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />

        <Text style={styles.title}>Select Time</Text>
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((time) => (
            <TimeSlot
              key={time}
              text={time}
              isSelected={selectedTime === time}
              onPress={() => setSelectedTime(time)}
            />
          ))}
        </View>

        <Text style={styles.title}>Select Service</Text>
        <View style={styles.timeSlotsContainer}>
          {services?.map((svc: any) => (
            <TimeSlot
              key={svc.id}
              text={svc.name}
              isSelected={serviceId === svc.id}
              onPress={() => setServiceId(svc.id)}
            />
          ))}
        </View>

        <Text style={styles.title}>Your Information</Text>
        <Input
          placeholder="Full Name"
          value={customerName}
          onChangeText={setCustomerName}
        />
        <View style={styles.spacer20} />
        <Input
          placeholder="Contact Number"
          value={customerContact}
          onChangeText={setCustomerContact}
          keyboardType="phone-pad"
        />

        <View style={styles.spacer40} />
        <Button title="Confirm Booking" onPress={handleBooking} />
        <View style={styles.spacer20} />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.h2,
    color: colors.primary,
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
  spacer20: {
    height: 20,
  },
  spacer40: {
    height: 40,
  },
});

export default BookingScreen;
