import React, { useState, useEffect } from "react";
import Stacknav from "./Stacknav";
import { Platform, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { useData, ThemeProvider } from '../hooks';


export default () => {
	const { isDark, theme, setTheme } = useData();

	/* set the status bar based on isDark constant */
	useEffect(() => {
		Platform.OS === 'android' && StatusBar.setTranslucent(true);
		StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
		return () => {
			StatusBar.setBarStyle('default');
		};
	}, [isDark]);

	// load custom fonts
	const [fontsLoaded] = useFonts({
		'OpenSans-Light': theme.assets.OpenSansLight,
		'OpenSans-Regular': theme.assets.OpenSansRegular,
		'OpenSans-SemiBold': theme.assets.OpenSansSemiBold,
		'OpenSans-ExtraBold': theme.assets.OpenSansExtraBold,
		'OpenSans-Bold': theme.assets.OpenSansBold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
			<ThemeProvider theme={theme} setTheme={setTheme}>
				<Stacknav />
			</ThemeProvider>
	);
};
