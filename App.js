import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Navigation from './src/navigations/Navigation'
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { DataProvider } from './src/hooks';

export default function App() {

	useEffect(() => {
		SplashScreen.preventAutoHideAsync();
		setTimeout(() => {
			SplashScreen.hideAsync();

		}, 3000);
	}, [])
	// load custom fonts

	return (
		<Provider store={store}>
			<DataProvider>
				<Navigation />
			</DataProvider>
		</Provider>
	);
}
