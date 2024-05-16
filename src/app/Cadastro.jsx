import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { debounce } from 'lodash';
import {router} from 'expo-router'

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number: ''
  });
  const registerData = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    cep: formData.cep,
    state: formData.state,
    city: formData.city,
    neighborhood: formData.neighborhood,
    street: formData.street,
    number: formData.number
  }

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.148.59:5000/register', registerData);
      Alert.alert('Sucesso', response.data.message);
      router.replace('/login')

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário. Tente novamente.');
    }
  };
  

  const fetchCepData = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        Alert.alert('CEP inválido', 'O CEP informado não foi encontrado.');
      } else {
        setFormData((prevData) => ({
          ...prevData,
          state: response.data.uf,
          city: response.data.localidade,
          neighborhood: response.data.bairro,
          street: response.data.logradouro
        }));
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o CEP. Tente novamente.');
    }
  };

  const debouncedFetchCepData = useCallback(debounce(fetchCepData, 1000), []);

  const handleCepChange = (cep) => {
    handleChange('cep', cep);
    if (cep.length === 8) {
      debouncedFetchCepData(cep);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#999"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#999"
          value={formData.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          placeholder="CEP"
          placeholderTextColor="#999"
          value={formData.cep}
          onChangeText={handleCepChange}
          keyboardType="numeric"
          maxLength={8} // Limita a entrada a 8 dígitos
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Estado</Text>
        <TextInput
          style={styles.input}
          placeholder="Estado"
          placeholderTextColor="#999"
          value={formData.state}
          onChangeText={(text) => handleChange('state', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#999"
          value={formData.city}
          onChangeText={(text) => handleChange('city', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bairro</Text>
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          placeholderTextColor="#999"
          value={formData.neighborhood}
          onChangeText={(text) => handleChange('neighborhood', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rua</Text>
        <TextInput
          style={styles.input}
          placeholder="Rua"
          placeholderTextColor="#999"
          value={formData.street}
          onChangeText={(text) => handleChange('street', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          placeholder="Número"
          placeholderTextColor="#999"
          value={formData.number}
          onChangeText={(text) => handleChange('number', text)}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleRegister}>
        <Text style={styles.textoBotao}> registrar </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242424'
  },
  title: {
    fontSize: 24,
    marginBottom:20,
    marginTop: 50,
    color: '#fff'
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff'
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#fff'// Cor do texto
  },
  botao:{
    marginBottom: 30,
    backgroundColor: '#D00000',
    padding: 10,
    borderRadius: 8,
  },
  textoBotao:{
    color: '#fff',
    fontSize: 20,
  }
});

export default RegisterScreen;
