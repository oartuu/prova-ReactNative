import {Stack} from 'expo-router'

export default function Layout (){
    return(
        <Stack>
            <Stack.Screen name='index' options={{title: 'login', headerShown: false }}/>
            <Stack.Screen name='Home' options={{title: 'home',headerShown: false }}/>
            <Stack.Screen name='Cadastro' options={{title: 'cadastro',headerShown: false}}/>
        </Stack>
    )
}