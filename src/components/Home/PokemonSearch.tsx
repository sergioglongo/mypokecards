import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Block, Product, Text } from "../../components";
import { useLazyGetPokemonByIdOrNameQuery } from "../../services/API/pokedexApi";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { PokemonFormated } from "../../constants/types/pokemonFormated";
import { globalVariables } from "../../themes/globalVariables";

export default function PokemonSearch() {
    const navigation = useNavigation();
    const [getPokemon, {
        data: pokemonFounded,
        isLoading: isLoadingPokemonFounded,
        isSuccess: isSuccessPokemonFounded,
        isError: isErrorPokemonFounded,
        error: errorPokemonFounded
    }] = useLazyGetPokemonByIdOrNameQuery();
    const [pokemonSelected, setPokemonSelected] = useState<PokemonFormated>({} as PokemonFormated);
    const [found, setFound] = useState(false);
    const [pokemonSearchText, setPokemonSearchText] = useState("");
    const [{ sizes }] = useState(globalVariables);
    const buttonRef = useRef<TouchableOpacity>(null);

    useEffect(() => {
        if (isSuccessPokemonFounded) {
            setPokemonSelected(pokemonFounded as PokemonFormated);
            // console.log("pokemonFounded", pokemonFounded);
            setFound(true);
        }
    }, [pokemonFounded])

    useEffect(() => {
        if (isErrorPokemonFounded) {
            setFound(false);
        }
    }, [errorPokemonFounded])

    const onPress = () => {
        if (pokemonSearchText) {
            getPokemon(pokemonSearchText);
        }
        setPokemonSelected({} as PokemonFormated);
        setFound(false);
    };

    return (
        <Block style={{ height: '100%', flex: 1 }}>
            <Block align='center' style={{ flex: 1 }}>
                <Block>
                    <Text style={styles.textTitle}>Busca tu pokemon</Text>
                </Block>
                <Block align='center' style={{ width:sizes.window_width }}>
                    {isLoadingPokemonFounded ? <ActivityIndicator animating={true} color={"blue"} size={50} /> : null}
                    {found &&
                        <Block >
                            <Product
                                id={pokemonSelected?.id}
                                title={pokemonSelected?.name}
                                description={pokemonSelected?.types?.join(", ")}
                                image={pokemonSelected?.image}
                                timestamp={pokemonSelected?.weight}
                                linkLabel={"Ver más"}
                                type={"horizontal"}
                            />
                        </Block>
                    }
                    <Block style={{ width:'100%'}}>
                        <TextInput
                            label="Buscar"
                            value={pokemonSearchText}
                            onChangeText={(text) => setPokemonSearchText(text)}
                            style={{ marginVertical: sizes.sm, width: '60%', alignSelf: 'center' }}
                            returnKeyType="send"
                            onSubmitEditing={() => {
                                buttonRef.current?.focus()
                                onPress()
                              }}/>

                    </Block>
                    <Button icon="camera" mode="contained" onPress={onPress}>
                        Search
                    </Button>
                </Block>
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
        marginVertical: 10,
    },
});
