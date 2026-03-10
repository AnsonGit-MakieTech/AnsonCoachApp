import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { fonts } from './src/themes/fonts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
        'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
        'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
        'Poppins-LightItalic': require('./assets/fonts/Poppins-LightItalic.ttf'),
        'Poppins-MediumItalic': require('./assets/fonts/Poppins-MediumItalic.ttf'),
        'Poppins-SemiBoldItalic': require('./assets/fonts/Poppins-SemiBoldItalic.ttf'),
        'Poppins-ThinItalic': require('./assets/fonts/Poppins-ThinItalic.ttf'),
        'Poppins-ExtraLightItalic': require('./assets/fonts/Poppins-ExtraLightItalic.ttf'),
        'Poppins-BlackItalic': require('./assets/fonts/Poppins-BlackItalic.ttf'),
        'Poppins-ExtraBoldItalic': require('./assets/fonts/Poppins-ExtraBoldItalic.ttf'),
        'Poppins-BoldItalic': require('./assets/fonts/Poppins-BoldItalic.ttf'),
    });

    if (!fontsLoaded) {
        return <Text>Loading fonts...</Text>;
    }


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
