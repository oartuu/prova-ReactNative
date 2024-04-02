import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Modal } from 'react-native';
import {router} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cadastro from './Cadastro';


const index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const handleLogin = async () => {
    if (!username || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }
  
    try {
      // Recuperar informações do usuário armazenadas localmente
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const parsedUserData = JSON.parse(userData);
        const { nome: storedUsername, password: storedPassword } = parsedUserData;
  
        // Verificar se as credenciais fornecidas coincidem com as armazenadas
        if (username === storedUsername && password === storedPassword) {
          // Lógica para redirecionar ou realizar outra ação após o login bem-sucedido
          router.replace('/Home')
        } else {
          alert('Credenciais inválidas');
        }
      } else {
        // Se não houver dados de usuário armazenados, alertar que o usuário não está cadastrado
        alert('Usuário não cadastrado');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
    }
  };
  

  const handleCadastro = async () => {
    // Realizar validações básicas nos campos de entrada
    if (!nome || !email || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
  
    try {
      // Armazenar informações do usuário localmente
      const userData = { nome, email, password };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      alert('Cadastro realizado com sucesso');
      closeModal();
  
      // Atualizar estados de email e password após o cadastro
      setEmail(email);
      setPassword(password);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />

      
      <Button title="Cadastrar" onPress={() => setModalVisible(true)} />

     
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Cadastro handleCadastro={handleCadastro} closeModal={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default index;
