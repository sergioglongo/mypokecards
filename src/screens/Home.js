import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Article, Block, Image, Product, Text } from "../components";
import { useLazyGetPokemonByIdOrNameQuery } from "../services/API/pokedexApi";
import { Button, TextInput } from "react-native-paper";


export default function Home() {
	const navigation = useNavigation();
	const [getPokemon, { data, isLoading, isSuccess, isError, error }] = useLazyGetPokemonByIdOrNameQuery();
	const [pokemonSelected, setPokemonSelected] = useState({});
	const [found, setFound] = useState(false);
	const [pokemonSearchText, setPokemonSearchText] = useState("");

	let response = "ninguno"

	useEffect(() => {
		if (isSuccess) {
			// console.log("Is Success", data);
			const pokemonFormated = {
				id: data?.id,
				name: data?.name,
				image: data?.sprites?.other?.["official-artwork"]?.front_default,
				types: data?.types?.map((type) => type.type.name),
				weight: data?.weight,
				height: data?.height,
			}
			console.log(pokemonFormated)
			setPokemonSelected(pokemonFormated);
			setFound(true);
		}
	}, [data])

	useEffect(() => {
		if (isError) {
			console.log("error", error);
			setFound(true);
		}
	}, [error])

	const onPress = () => {
		pokemonSearchText && getPokemon(pokemonSearchText);
	};

	return (
		<Block column justify='flex-start' align='center'>
			<Block>
				<Text style={styles.textTitle}>Home Screen</Text>

			</Block>
			{/* <Button mode="contained"
				title="Go to Details screen"
				onPress={() => navigation.navigate("Details")}
			/> */}
			<Block>
				<Text>Nombre del Pokemon: {found ? pokemonSelected?.name : "No encontrado"}</Text>
			</Block>
			{found &&
				<Block >
					<Product
						id={pokemonSelected?.id}
						title={pokemonSelected?.name}
						description={pokemonSelected?.types?.join(", ")}
						image={pokemonSelected?.image}
						timestamp={pokemonSelected?.weight}
						linkLabel={"Ver más"}
						type={"Vertical"}
					/>
				</Block>
			}
			<Block>
				<TextInput
					label="Buscar"
					value={pokemonSearchText}
					onChangeText={(text) => setPokemonSearchText(text)}
				/>
				<Button icon="camera" mode="contained" onPress={onPress}>
					Search
				</Button>
			</Block>
		</Block>
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
