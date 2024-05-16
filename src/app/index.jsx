import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import {router} from 'expo-router'
//import Cadastro from './Cadastro';


const Login = () => {
  function cadastro(){
    router.replace('/Cadastro')
  }
  function login(){
    router.replace('/Login')
  }
  const foto = '../../assets/sem.png'
  return (
    
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.texto}>Bem vindo</Text>
      </View>
      
      <View>
        <Image source={require(foto)} style={{height: 280,
    width: 280}}/>
        <View style={styles.containerBotao}> 
        <TouchableOpacity style={styles.botao} onPress={login}><Text style={styles.textoBotao}>Entrar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={cadastro}><Text style={styles.textoBotao}>Cadastrar</Text></TouchableOpacity>
        </View>
        
      </View>
    </View>
    
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#242424',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 180
  },
  containerBotao: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop:20 
  },
  botao:{
    marginBottom: 30,
    backgroundColor: '#D00000',
    padding: 10,
    borderRadius: 8,
  },
  texto:{
    color: '#fff',
    fontSize: 40, 
  
    fontWeight: '600'
  },
  textoBotao:{
    color: '#fff',
    fontSize: 20,
  }
});

export default Login;
