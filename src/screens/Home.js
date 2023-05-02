import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Block, Text } from "../components";
import { ScrollView } from "react-native-gesture-handler";
import PokemonSearch from "../components/Home/PokemonSearch";
import PokemonSlider from "../components/Home/PokemonSlider";


export default function Home() {
	const navigation = useNavigation();
	
	return (
		<Block style={{ height: '100%', flex: 1 }}>
			<ScrollView >
				<Block align='center' style={{ flex: 1 }}>
					<Block>
						<Text style={styles.textTitle}>Listado de Pokemones</Text>
					</Block>
					<Block>
						<PokemonSlider />
					</Block>
					<Block>
						<PokemonSearch />
					</Block>
				</Block>
			</ScrollView >
		</Block >
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		paddingTop: 15,
	},
	textTitle: {
		fontWeight: "bold",
		fontSize: 20,
		color: "#3db83a",
	},
});
