import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography } from '../theme';
import Card from './Card';

const FaqItem = ({ item, isExpanded, onPress }) => {
  return (
    <Card style={styles.faqContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{item.question}</Text>
        </View>
      </TouchableOpacity>
      {isExpanded && <Text style={styles.answer}>{item.answer}</Text>}
    </Card>
  );
};

const styles = StyleSheet.create({
  faqContainer: {
    marginBottom: 16,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    ...typography.h2,
    color: colors.text,
    flex: 1,
  },
  answer: {
    ...typography.body,
    marginTop: 10,
    color: colors.gray,
  },
});

export default FaqItem;