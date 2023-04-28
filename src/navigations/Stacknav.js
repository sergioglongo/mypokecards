import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useData} from '../hooks';

import Drawernav from "./Drawernav";

import Details from "../screens/Details";

const Stack = createNativeStackNavigator();

export default function Stacknav() {
	const { isDark, theme, setTheme } = useData();
	
	const navigationTheme = {
		...DefaultTheme,
		dark: isDark,
		colors: {
		  ...DefaultTheme.colors,
		  border: 'rgba(0,0,0,0)',
		  text: String(theme.colors.text),
		  card: String(theme.colors.card),
		  primary: String(theme.colors.primary),
		  notification: String(theme.colors.primary),
		  background: String(theme.colors.background),
		},
	  };

	return (
		<NavigationContainer theme={navigationTheme}>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="Drawer" component={Drawernav} />
				<Stack.Screen
					name="Details"
					component={Details}
					options={{
						headerShown: true,
						headerTitle: "Details Page",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
