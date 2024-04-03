import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {router} from 'expo-router'
function Home () {

  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Recuperar informações do usuário armazenadas localmente
        const userData = await AsyncStorage.getItem('userData');
        if (userData !== null) {
          const parsedUserData = JSON.parse(userData);
          setUsername(parsedUserData.nome);
        }
      } catch (error) {
        console.error('Erro ao tentar recuperar nome do usuário:', error);
      }
    };

    fetchUsername();
  }, []);

const sair = async ()=>{
    try {
      // Finalizar a sessão (remover indicador de sessão ativa)
      await AsyncStorage.removeItem('isLoggedIn');

      // Redirecionar para a tela de login
      router.navigate('/Index')
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  



  return (
    <ImageBackground source={require('../../assets/home.jpeg')} style= {styles.container} >
      <Text style={styles.texto}> Bem vindo, {username} </Text>


      <TouchableOpacity  onPress={sair} style={styles.botao}> 
        <Text style={styles.textoBotao}> Logout</Text>
      </TouchableOpacity>


    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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