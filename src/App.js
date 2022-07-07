import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen
import WelcomeScreen from './screens/Onboarding/WelcomeScreen';
import InputMemorization from './screens/Onboarding/InputMemorization';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer
    >
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="InputMemorization" component={InputMemorization} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App)
