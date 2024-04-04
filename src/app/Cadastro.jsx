import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cadastro = ({ closeModal }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#07273C' }}>
        <Text style={{
          color: '#fff',
          fontSize: 30,
          marginBottom: 50,
          fontWeight: '600'
        }}>Cadastro</Text>
        <TextInput
          placeholder="Nome"
          value={nome}
          placeholderTextColor="#d3d3d3"
          color = "#d3d3d3"
          onChangeText={setNome}
          style={{ borderWidth: 1, padding: 10, margin: 10, width: 200, borderColor:'#60B1E8', borderRadius: 5, }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          placeholderTextColor="#d3d3d3"
          color = "#d3d3d3"
          onChangeText={setEmail}
          style={{ borderWidth: 1, padding: 10, margin: 10, width: 200, borderColor:'#60B1E8', borderRadius: 5, }}
        />
        <TextInput
          placeholder="Senha"
          value={password}
          placeholderTextColor="#d3d3d3"
          color = "#d3d3d3"
          onChangeText={setPassword}
          secureTextEntry
          style={{ borderWidth: 1, padding: 10, margin: 10, width: 200, borderColor:'#60B1E8', borderRadius: 5, }}
        />
        <TextInput
          placeholder="Confirmar Senha"
          value={confirmPassword}
          placeholderTextColor="#d3d3d3"
          color = "#d3d3d3"
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={{ borderWidth: 1, padding: 10, margin: 10, width: 200, borderColor:'#60B1E8' , borderRadius: 5,}}
        />

        <TouchableOpacity style={{
          marginBottom: 30,
          backgroundColor: '#0A6EC6',
          padding: 10,
          borderRadius: 8,
        }}
        onPress={handleCadastro}>
          <Text style={{
            color: '#fff',
            fontSize: 20,
          }}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          marginBottom: 30,
          backgroundColor: '#0A6EC6',
          padding: 10,
          borderRadius: 8,
        }}
        onPress={closeModal}>
          <Text style={{
            color: '#fff',
            fontSize: 20,
          }}>Fechar</Text>
        </TouchableOpacity>

      {/* <Button title="Cadastrar" onPress={handleCadastro} />
      <Button title="Fechar" onPress={closeModal} /> */}
      </View>
    </ScrollView>
  );
};

export default Cadastro;
