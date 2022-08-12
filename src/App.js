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
import Mushaf from 'screens/Mushaf';
import Loading from 'screens/Onboarding/Loading';

// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context
import { useOnBoardingState } from 'context/OnBoardingContext';
import { useEffect, useState } from 'react';
import { UserDataProvider, useUserData } from 'context/UserDataContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loading,setLoading] = useState(true)
  const { _, dispatch } = useOnBoardingState()
  const { userDataState, dispatch: userDispatch } = useUserData()

  // console.log('userData', userDataState)

  const getUserPreference = async () => {
    setLoading(true)
    try {
      const value = await AsyncStorage.getItem('userPreferences');
      if (value !== null) {
        dispatch({
          action: 'SET_ONBOARDING_STATUS',
          payload: false
        })
        userDispatch({
          action: 'SET_USER_DATA',
          payload: JSON.parse(value),
        })
        return setLoading(false)
      }
      dispatch({
        action: 'SET_ONBOARDING_STATUS',
        payload: true,
      })
      return setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getUserPreference()
  },[])

  if (loading) return <Loading />

  return (
      <NavigationContainer
      >
        {/* TODO: protect route based on personalization value */}
        <Stack.Navigator
          initialRouteName="Mushaf"
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
              {/* Mushaf */}
              <Stack.Screen name="Mushaf" component={Mushaf} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const AppWrapper = () => {
  return (
    <UserDataProvider>
      <OnBoardingProvider>
        <App />
      </OnBoardingProvider>
    </UserDataProvider>
  )
}

registerRootComponent(AppWrapper)
