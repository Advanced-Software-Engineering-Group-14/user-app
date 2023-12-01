import { StatusBar } from 'expo-status-bar';
import ClientProvider from './app/components/providers/client-provider';
import { AuthProvider } from './app/context/auth-context';
import NavigationLayout from './app/layout/navigation-layout';

export default function App() {
  return (
    <ClientProvider>
      <AuthProvider>
          <StatusBar style="dark" />
          <NavigationLayout>

          </NavigationLayout>
      </AuthProvider>
    </ClientProvider>
  );
}
