import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Container from '../components/Container';
import Title from '../components/Title';
import Button from '../components/Button';
import FaqItem from '../components/FaqItem';

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
    <FaqItem
      item={item}
      isExpanded={expanded === item.id}
      onPress={() => setExpanded(expanded === item.id ? null : item.id)}
    />
  );

  return (
    <Container>
      <Title text="Help & FAQs" />
      <FlatList
        data={faqs}
        renderItem={renderFaq}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.flex1} />
      <Button title="Live Chat" onPress={() => navigation.navigate('Chat')} />
    </Container>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export default HelpScreen;
