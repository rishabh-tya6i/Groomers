
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const faqs = [
  {
    id: '1',
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment by selecting a salon, choosing a service, and then picking a date and time that works for you.',
  },
  {
    id: '2',
    question: 'Can I cancel my booking?',
    answer: 'Yes, you can cancel your booking from the "My Bookings" screen. Please note any cancellation policies the salon may have.',
  },
  {
    id: '3',
    question: 'How do I update my profile?',
    answer: 'You can update your profile information from the "Profile" screen. Tap the "Edit Profile" button to make changes.',
  },
];

const HelpScreen = ({ navigation }: any) => {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const renderFaq = ({ item }: { item: { id: string; question: string; answer: string } }) => (
    <View style={styles.faqContainer}>
      <TouchableOpacity onPress={() => setExpanded(expanded === item.id ? null : item.id)}>
        <Text style={styles.question}>{item.question}</Text>
      </TouchableOpacity>
      {expanded === item.id && <Text style={styles.answer}>{item.answer}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & FAQs</Text>
      <FlatList
        data={faqs}
        renderItem={renderFaq}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chat')}>
        <Text style={styles.chatButtonText}>Live Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  faqContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  chatButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HelpScreen;
