import { Redirect, Stack } from 'expo-router';

import { useSession } from '../../../../../src/components/providers/session-provider';
import { Text } from 'react-native';

export default function AppLayout() {
    const {  isLoading, user } = useSession();

    // const user = JSON.parse(session || "")
    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text> Loading ...</Text>;
    }



    if (!user?.package) {
        return <Redirect href="/select-package" />

    }


   

    // This layout can be deferred because it's not the root layout.
    return <Stack  screenOptions={{
        headerShown: false
    }} />;
}