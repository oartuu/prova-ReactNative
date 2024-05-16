import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {router} from 'expo-router'

const LoginScreen = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (name, value) => {
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.148.59:5000/login', loginData); // Substitua pelo seu IP local
      Alert.alert('Sucesso', response.data.message);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={loginData.email}
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
          value={loginData.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}> entrar </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#242424'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
    color: '#fff' // Cor do texto
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

export default LoginScreen;
