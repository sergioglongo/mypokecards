import React, {useState} from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Block, Text } from "../components";
import { ScrollView } from "react-native-gesture-handler";
import PokemonSearch from "../components/Home/PokemonSearch";
import PokemonSlider from "../components/Home/PokemonSlider";
import Modal from "../components/Modal";
import PokemonBasicCard from "../components/PokemonBasicCard";


export default function Home() {
	const navigation = useNavigation();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pokemonCard, setPokemonCard] = useState(null);

	const showDetails = (pokemon) => {
		console.log("showDetails");
		setPokemonCard(pokemon);
		setIsModalVisible(true);
	};

	return (
		<Block style={{ height: '100%', flex: 1 }}>
			<ScrollView >
				<Block align='center' style={{ flex: 1 }}>
					<Block>
						<Text style={styles.textTitle}>Listado de Pokemones</Text>
					</Block>
					<Block>
						<PokemonSlider showDetails={showDetails} />
					</Block>
					<Block>
						<PokemonSearch />
					</Block>
				</Block>
			</ScrollView >
			<Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
				<PokemonBasicCard 
				 pokemon={pokemonCard}
				//  height={'auto'}
				onClose={() => setIsModalVisible(false)}
				/>
			</Modal>
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
