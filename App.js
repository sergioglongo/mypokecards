import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Navigation from './src/navigations/Navigation'
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { DataProvider } from './src/hooks';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App() {

  const queryClient = new QueryClient();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 3000);
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          <Navigation />
        </DataProvider>
      </QueryClientProvider>
    </Provider>
  );
}
