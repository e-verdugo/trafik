import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Base } from './styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Search from './components/Search';
import Delays from './components/Delays';
import Profile from './components/Profile';
import More from './components/More';
import Map from './components/Map';

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <SafeAreaView style={Base.base}>
            <View style={Base.base}>
                <StatusBar style="auto" />
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Search" component={Search} />
                        <Stack.Screen name="Delays" component={Delays} />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="More" component={More} />
                        <Stack.Screen name="Map" component={Map} />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </SafeAreaView>
    );
}