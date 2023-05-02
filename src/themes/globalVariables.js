import { Dimensions, Platform } from "react-native";
import Constants from "expo-constants";
const phone_height = Dimensions.get("window").height;
const phone_width = Dimensions.get("window").width;
const statusBarHeight = Constants.statusBarHeight;

let window_height;
if (Platform.OS === "web") {
	window_height = 900;
}
if (Platform.OS === "android") {
	if (statusBarHeight > 24) {
		window_height = phone_height;
	} else {
		window_height = phone_height - statusBarHeight;
	}
}
if (Platform.OS === "ios") {
	window_height = phone_height - statusBarHeight;
}

// -----------------------------------VARIABLES GLOBLES----------------------------------
export const globalVariables = {
	sizes: {
		window_height: window_height,
		window_width: phone_width,
		statusBarHeight: statusBarHeight,
		bottombar_height: 50,
		topbar_height: 60,
		s: 5,
		sm: 10,
		m: 15,
		ml: 20,
		l: 25,
		xl: 30,
	},
	colors: {
		/* Blanco */
		white: "#FFFFFF",
		/* Negro */
		black: "#1C1B1F",
		/* Negro safe areas */
		black_top: "#000000",
		/* Violeta */
		violet: "#9747FF",
		/* Violeta 50 % rgba */
		violet_05: "rgba(99, 71, 235, 0.5)",
		/* Violeta 40 % */
		violet_04: "#B7ACED",
		/* Violeta desabilitado */
		violet_02: "#BA85FF",
		/* Violeta arrows */
		violet_03: "#A295E2",
		/* Violeta background */
		violet_06: "#E3E0F3",
		/* Azul */
		blue: "#37455E",
		/* error */
		red: "#F16C4E",
		/* Gris */
		gray: "#9CABC2",
		gray_2: "#8E929C",
		/* Yellow back */
		yellow: "#FFCC3A",
		/* Verde fondo */
		aqua_green: "#DCEDEE",
	},
	line_height: "normal",
	font_weight: {
		regular: "400",
		medium: "500",
		bold: "700",
	},
	font_size: {
		xsmall: 10,
		small: 14,
		medium: 16,
		large: 18,
		xlarge: 20,
		xxlarge: 22,
	},
	radius: {
		small: 10,
		medium: 20,
		large: 30,
	},
};
