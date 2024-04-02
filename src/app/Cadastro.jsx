import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cadastro</Text>
        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={{ borderWidth: 1, padding: 10, margin: 10, width: 200 }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ borderWidth: 1, padding: 10, margin: 10, width: 200 }}
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ borderWidth: 1, padding: 10, margin: 10, width: 200 }}
        />
        <TextInput
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={{ borderWidth: 1, padding: 10, margin: 10, width: 200 }}
        />
        <Button title="Cadastrar" onPress={handleCadastro} />
        <Button title="Fechar" onPress={closeModal} />
      </View>
    </ScrollView>
  );
};

export default Cadastro;
