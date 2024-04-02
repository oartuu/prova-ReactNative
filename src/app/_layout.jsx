import {Stack} from 'expo-router'

export default function Layout (){
    return(
        <Stack>
            <Stack.Screen name='index' options={{title: 'login'}}/>
            <Stack.Screen name='Home' options={{title: 'home'}}/>
            <Stack.Screen name='Cadastro' options={{title: 'cadastro'}}/>
        </Stack>
    )
}