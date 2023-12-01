import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/auth-context";
import HomeScreen from "../screens/home";
import LoginScreen from "../screens/login"
import Button from "../components/ui/button";
import IntroScreen from "../screens/intro";
import ForgotPasswordScreen from "../screens/forgot-password";


const Stack = createNativeStackNavigator()

export default function NavigationLayout() {
    const { authState, onLogout } = useAuth()

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} >
                {
                    authState?.authenticated ? (

                        <Stack.Group>
                            {
                                !authState?.user?.meta?.isVerified ? (

                                    <Stack.Group>
                                        <Stack.Screen name="Home" options={{
                                            headerRight: () => <Button action={onLogout} label="Sign Out" />
                                        }} component={HomeScreen}></Stack.Screen>
                                    </Stack.Group>
                                ) : (
                                    <Stack.Group>
                                        <Stack.Screen name="Verify" component={LoginScreen} ></Stack.Screen>

                                    </Stack.Group>
                                )
                            }

                        </Stack.Group>
                    ) : (
                        <Stack.Group>

                            <Stack.Screen name="Intro" component={IntroScreen} ></Stack.Screen>
                            <Stack.Screen name="Login" component={LoginScreen} ></Stack.Screen>
                            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} ></Stack.Screen>
                        </Stack.Group>

                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}