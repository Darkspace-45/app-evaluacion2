import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RestablecerScreen from "../screens/RestablecerScreen";
import OperacionesScreen from "../screens/OperacionesScreen";
import { Image, View } from "react-native";
import HistorialScreen from "../screens/HistorialScreen";
import PerfilScreen from "../screens/PerfilScreen";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Operaciones" component={MyTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Restablecer" component={RestablecerScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: '#f8f8f8' },
            }}
        >
            <Tab.Screen
                name="Operaciones"
                component={OperacionesScreen}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../assets/img/deposito.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Historial"
                component={HistorialScreen}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../assets/img/saldo-de-cuenta.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    )
                }}
                />
            <Tab.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{
                    tabBarIcon: () => (
                    <Image
                        source={require('../assets/img/usuario.png')}
                        style={{ width: 25, height: 25 }}
                    />
                )}}
            />
        </Tab.Navigator>
    );
}

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
