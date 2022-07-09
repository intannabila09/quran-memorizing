import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen
import WelcomeScreen from 'screens/Onboarding/WelcomeScreen';
import InputMemorization from 'screens/Onboarding/InputMemorization';
import InputByJuz from 'screens/Onboarding/InputMemorization/InputByJuz';
import { OnBoardingProvider } from './context/OnBoardingContext';
import InputBySurah from 'screens/Onboarding/InputMemorization/InputBySurah';
import PersonalizationConfig from 'screens/Onboarding/PersonalizationConfig';

import Homepage from 'screens/Homepage';
import MemorizationProgress from 'screens/Progress';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <OnBoardingProvider>
      <NavigationContainer
      >
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}
        >
            {/* Onboarding Screen */}
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="InputMemorization" component={InputMemorization} />
            <Stack.Screen name="InputByJuz" component={InputByJuz} />
            <Stack.Screen name="InputBySurah" component={InputBySurah} />
            <Stack.Screen name="PersonalizationConfig" component={PersonalizationConfig} />

            {/* Homepage */}
            <Stack.Screen name="Homepage" component={Homepage} />

            {/* Memorization Progress */}
            <Stack.Screen name="MemorizationProgress" component={MemorizationProgress} />
        </Stack.Navigator>
      </NavigationContainer>
    </OnBoardingProvider>
  );
}

registerRootComponent(App)
