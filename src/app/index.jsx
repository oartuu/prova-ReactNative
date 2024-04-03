import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet,Alert, Modal, ImageBackground, Text, TouchableOpacity } from 'react-native';
import {router} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cadastro from './Cadastro';


const index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const bacgroundImage = '../../assets/login.jpeg'
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
      if (loggedInStatus === 'true') {
        setIsLoggedIn(true);
       router.replace('/Home')
      }
    } catch (error) {
      console.error('Erro ao verificar status de login:', error);
    }
  };

  
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
          setIsLoggedIn(true);
          await AsyncStorage.setItem('isLoggedIn', 'true');
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
  

  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.removeItem('isLoggedIn');
      Alert.alert('Sucesso', 'Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao tentar fazer logout:', error);
      Alert.alert('Erro', 'Erro ao tentar fazer logout');
    }
  };

  const handleCadastro = async () => {
    // Realizar validações básicas nos campos de entrada
    if (!username || !email || !password || !confirmPassword) {
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
    
      <ImageBackground source={require(bacgroundImage)} resizeMode="cover" style={styles.container}>
      <Text style={styles.texto} >Realize Login</Text>
      {/* Campos de login */}
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#d3d3d3"
        color = '#60B1E8'
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#d3d3d3"
        color = '#60B1E8'
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={isLoggedIn}>
        <Text style={styles.textoBotao}>Login</Text>
      </TouchableOpacity>

      {isLoggedIn && 
      <TouchableOpacity  onPress={handleLogout} style={styles.botao}> 
        <Text style={styles.textoBotao}> Logout</Text>
      </TouchableOpacity>}

      {!isLoggedIn && 
      <TouchableOpacity
          style={styles.botao}
          onPress={() => setModalVisible(true)}
          disabled={isLoggedIn}>
            <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      }
      
     
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Cadastro handleCadastro={handleCadastro} closeModal={() => setModalVisible(false)} />
      </Modal>
      </ImageBackground>
    
      
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
    height:40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  botao:{
    marginBottom: 30,
    backgroundColor: '#0A6EC6',
    padding: 10,
    borderRadius: 8,
  },
  texto:{
    color: '#fff',
    fontSize: 30,
    marginBottom: 50,
    fontWeight: '600'
  },
  textoBotao:{
    color: '#fff',
    fontSize: 20,
  }
});

export default index;
