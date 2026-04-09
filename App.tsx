import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { Merriweather_400Regular } from '@expo-google-fonts/merriweather/400Regular'
import { Merriweather_300Light } from '@expo-google-fonts/merriweather/300Light'
import { ActivityIndicator, View } from 'react-native'
import { LoginScreen } from './src/screens/LoginScreen'
import { AssessmentListScreen } from './src/screens/AssessmentListScreen'
import { AssessmentDetailScreen } from './src/screens/AssessmentDetailScreen'
import { AssessmentCompleteScreen } from './src/screens/AssessmentCompleteScreen'
import { ProfileScreen } from './src/screens/ProfileScreen'
import { RootStackParamList } from './src/types'
import { AssessmentProgressProvider } from './src/context/AssessmentProgress'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Merriweather-Regular': Merriweather_400Regular,
    'Merriweather-Light': Merriweather_300Light,
  })

  if (!fontsLoaded && !fontError) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>
  }

  return (
    <AssessmentProgressProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AssessmentList" component={AssessmentListScreen} />
        <Stack.Screen name="AssessmentDetail" component={AssessmentDetailScreen} />
        <Stack.Screen name="AssessmentComplete" component={AssessmentCompleteScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </AssessmentProgressProvider>
  )
}
