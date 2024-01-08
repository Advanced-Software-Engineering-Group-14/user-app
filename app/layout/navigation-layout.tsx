import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/auth-context";
import Button from "../components/ui/button";
import { ForgotPasswordScreen, HomeScreen, IntroScreen, LoginScreen, RegisterScreen, CompleteProfileScreen } from "../screens"


const Stack = createNativeStackNavigator()

export default function NavigationLayout() {
    const { authState, onLogout, } = useAuth()

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} >
                {
                    authState?.authenticated ? (

                        <Stack.Group>
                            {
                                !!authState?.user?.residence ? (

                                    <Stack.Group>
                                        <Stack.Screen name="Home" options={{
                                            headerRight: () => <Button action={onLogout} label="Sign Out" />
                                        }} component={HomeScreen}></Stack.Screen>
                                    </Stack.Group>
                                ) : (
                                    <Stack.Group>
                                        <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} ></Stack.Screen>

                                    </Stack.Group>
                                )
                            }

                        </Stack.Group>
                    ) : (
                        <Stack.Group>

                            <Stack.Screen name="Intro" component={IntroScreen} ></Stack.Screen>
                            <Stack.Screen name="Register" component={RegisterScreen} ></Stack.Screen>
                            <Stack.Screen name="Login" component={LoginScreen} ></Stack.Screen>
                            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} ></Stack.Screen>
                            <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} ></Stack.Screen>

                        </Stack.Group>

                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}