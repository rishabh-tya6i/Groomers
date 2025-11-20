
import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

const TermsAndConditionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.text}>
        Please read these terms and conditions carefully before using Our Service.
      </Text>
      
      <Text style={styles.heading}>Interpretation and Definitions</Text>
      <Text style={styles.text}>
        The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
      </Text>

      <Text style={styles.heading}>Acknowledgment</Text>
      <Text style={styles.text}>
        These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
      </Text>

      <Text style={styles.heading}>User Accounts</Text>
      <Text style={styles.text}>
        When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.
      </Text>
      
      <Text style={styles.heading}>Termination</Text>
      <Text style={styles.text}>
        We may terminate or suspend Your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
      </Text>
    </ScrollView>
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
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default TermsAndConditionsScreen;
