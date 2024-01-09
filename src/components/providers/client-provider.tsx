import React, { useCallback, useEffect, useState } from 'react';
import * as ExpoSplashScreen from 'expo-splash-screen';

import SplashScreen from '../../screens/splash';
import { View } from 'react-native';
import * as Font from "expo-font"

export default function ClientProvider({ children }: { children: React.ReactNode }) {
    const [appIsReady, setAppIsReady] = useState(false);



    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await ExpoSplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return <SplashScreen />;
    }

    return (
        <View style={{
            flex: 1,
        }} onLayout={onLayoutRootView}>
            {children}
        </View>
    )
}