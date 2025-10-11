
import React, { useEffect, useState } => 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert, Modal } from 'react-native';
import api from '../services/api';
import { useSalon } from '../context/SalonContext';

const ServiceManagementScreen = ({ route, navigation }) => {
  const { isFirstService } = route.params || {};
  const { salon } = useSalon();
  const [services, setServices] = useState([]);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceDuration, setNewServiceDuration] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const fetchServices = async () => {
    if (!salon) return;
    try {
      const response = await api.get(`/salons/${salon.id}/services`);
      setServices(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch services.');
    }
  };

  useEffect(() => {
    fetchServices();
  }, [salon]);

  const handleAddService = async () => {
    if (!salon) return;
    if (!newServiceName || !newServicePrice || !newServiceDuration) {
      Alert.alert('Error', 'Please fill in all service details.');
      return;
    }
    try {
      const response = await api.post(`/salons/${salon.id}/services`, {
        name: newServiceName,
        priceCents: parseInt(newServicePrice) * 100,
        durationMinutes: parseInt(newServiceDuration),
      });
      setServices([...services, response.data]);
      setNewServiceName('');
      setNewServicePrice('');
      setNewServiceDuration('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add service.');
    }
  };

  const handleDeleteService = async (serviceId) => {
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete this service?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await api.delete(`/services/${serviceId}`);
              setServices(services.filter((service) => service.id !== serviceId));
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Failed to delete service.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setIsEditModalVisible(true);
  };

  const handleUpdateService = async () => {
    if (!selectedService) return;
    try {
      const response = await api.put(`/services/${selectedService.id}`, {
        name: selectedService.name,
        priceCents: selectedService.priceCents,
        durationMinutes: selectedService.durationMinutes,
      });
      setServices(services.map((service) => (service.id === selectedService.id ? response.data : service)));
      setIsEditModalVisible(false);
      setSelectedService(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update service.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isFirstService ? 'Add Your First Service' : 'Manage Services'}</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.serviceItem}>
            <View>
              <Text>{item.name}</Text>
              <Text>${item.priceCents / 100}</Text>
            </View>
            <View style={styles.buttons}>
              <Button title="Edit" onPress={() => handleEditService(item)} />
              <Button title="Delete" color="red" onPress={() => handleDeleteService(item.id)} />
            </View>
          </View>
        )}
      />

      <View style={styles.addServiceContainer}>
        <TextInput style={styles.input} placeholder="Service Name" value={newServiceName} onChangeText={setNewServiceName} />
        <TextInput style={styles.input} placeholder="Price" value={newServicePrice} onChangeText={setNewServicePrice} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Duration (minutes)" value={newServiceDuration} onChangeText={setNewServiceDuration} keyboardType="numeric" />
        <Button title="Add Service" onPress={handleAddService} />
      </View>

      {isFirstService && (
        <Button
          title="Finish"
          disabled={services.length === 0}
          onPress={() => navigation.navigate('AppointmentList')}
        />
      )}

      {selectedService && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isEditModalVisible}
          onRequestClose={() => {
            setIsEditModalVisible(!isEditModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Edit Service</Text>
              <TextInput style={styles.input} placeholder="Service Name" value={selectedService.name} onChangeText={(text) => setSelectedService({ ...selectedService, name: text })} />
              <TextInput style={styles.input} placeholder="Price" value={(selectedService.priceCents / 100).toString()} onChangeText={(text) => setSelectedService({ ...selectedService, priceCents: parseInt(text) * 100 })} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="Duration (minutes)" value={selectedService.durationMinutes.toString()} onChangeText={(text) => setSelectedService({ ...selectedService, durationMinutes: parseInt(text) })} keyboardType="numeric" />
              <Button title="Update Service" onPress={handleUpdateService} />
              <Button title="Cancel" color="red" onPress={() => setIsEditModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
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
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ServiceManagementScreen;
