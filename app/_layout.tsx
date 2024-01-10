import { Slot , Stack, useNavigation} from 'expo-router';
import { SessionProvider } from '../src/components/providers/session-provider';
import QueryProvider from '../src/components/providers/query-provider';
import React from 'react';

export default function Root() {


  return (
    <SessionProvider>
      <QueryProvider>
        <Slot screenOptions={{
            headerShown: false
        }}/>
      </QueryProvider>
    </SessionProvider>
  );
}