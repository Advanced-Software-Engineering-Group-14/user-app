import { StatusBar } from 'expo-status-bar';
import ClientProvider from './src/components/providers/client-provider';
import { AuthProvider } from './src/context/auth-context';

export default function App() {
  return (
    // <ClientProvider>
      <AuthProvider>
          <StatusBar style="dark" />

      </AuthProvider>
    // </ClientProvider>
  );
}
