import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './screens/Home';
import Login from './screens/Login';

const StackNav = createNativeStackNavigator()

export default function App() {


  return (
    <AuthProvider>
      <Layout/>
    </AuthProvider>
  );
}

export const Layout =()=>{

 

  const {authState,onSignOut} = useAuth();

  return <NavigationContainer>
        <StackNav.Navigator>
          {
            authState.authenticated ? <StackNav.Screen name='Home' component={Home} options={
              {
                headerRight : ()=> (<Button onPress={onSignOut} title='Sign out' />)
              }
            } /> : <StackNav.Screen name='Login' component={Login} />
          }
        </StackNav.Navigator>
  </NavigationContainer>
}
