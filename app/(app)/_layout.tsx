import { Redirect, Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { useSession } from '../../src/components/providers/session-provider';
import Loader from '../../src/components/core/loading';
import { HomeownerRes } from '../../src/types';
import { Text } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AppLayout() {
    const { user } = useSession();


    useEffect(() => {
        // const parsedUser = JSON.parse(session || "")
        // console.log(user)
        // setUser(parsedUser)
    });


    // const user = JSON.parse(session || "")
    // You can keep the splash screen open, or render a loading screen like we do here.

    // check if user is logged in
    if (!user) {
        return <Redirect href="/login" />;
    }


    // This layout can be deferred because it's not the root layout.
    return <Stack
        screenOptions={{
            headerShown: false
        }}
    />;
}