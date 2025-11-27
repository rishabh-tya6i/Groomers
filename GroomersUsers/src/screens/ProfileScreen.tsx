import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Container from '../components/Container';
import Input from '../components/Input';
import Button from '../components/Button';
import ProfileHeader from '../components/ProfileHeader';
import { colors, typography } from '../theme';
import { useAuth } from '../state/AuthContext';

const ProfileScreen = ({ navigation }: any) => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useAuth();

  const handleSave = () => {
    // Add save logic here
    setIsEditing(false);
    Alert.alert('Profile Saved', 'Your profile has been updated successfully.');
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <Container>
      <ProfileHeader name={name} imageUrl="https://via.placeholder.com/150" />

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <Input
          value={name}
          onChangeText={setName}
          editable={isEditing}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email</Text>
        <Input
          value={email}
          onChangeText={setEmail}
          editable={isEditing}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone</Text>
        <Input
          value={phone}
          onChangeText={setPhone}
          editable={isEditing}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.flex1} />

      {isEditing ? (
        <Button title="Save" onPress={handleSave} />
      ) : (
        <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
      )}
      <View style={styles.spacer16} />
      <Button
        title="Logout"
        onPress={handleLogout}
        disabled={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    ...typography.body,
    color: colors.text,
    marginBottom: 5,
  },
  flex1: {
    flex: 1,
  },
  spacer16: {
    height: 16,
  },
});

export default ProfileScreen;