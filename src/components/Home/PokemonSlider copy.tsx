import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { useGetPokemonLimitQuery } from '../../services/API/pokedexApi';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Image from '../Image';

const PAGE_SIZE = 5;
const fetchPosts = async (page = 0, limit = PAGE_SIZE) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page}`);
    const data = await response.json();
    const pokemonList = data.results;

    const pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
        const detailsResponse = await fetch(pokemon.url);
        const detailsData = await detailsResponse.json();
        return detailsData;
    });

    const pokemonDetails = await Promise.all(pokemonDetailsPromises);

    return {
        pokemonList,
        pokemonDetails
    };
};

function PokemonList() {

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery(
        'pokemonList',
        ({ pageParam = 0 }) => fetchPosts(pageParam),
        {
            getNextPageParam: (lastPage, pages) => lastPage.pokemonList.length ? pages.length * PAGE_SIZE : undefined,
            keepPreviousData: true
        }
    );


    if (isLoading) {
        return <Text>Cargando...</Text>;
    }


    const pokemonListShow = data.pages
        .flatMap((page) => page.pokemonList)
        .map((pokemon, index) => {
            const details = data.pages.flatMap((page) => page.pokemonDetails)[index];

            return (
                <View key={pokemon.name} style={styles.card}>
                    <Text style={styles.name}>{pokemon.name}</Text>
                    <Image
                        resizeMode="cover"
                        source={{ uri: details?.sprites?.other?.["official-artwork"]?.front_default }}
                        style={{
                            height: 30,
                            width: 30,
                        }}
                    />
                    <Text>Altura: {details?.height}</Text>
                    <Text>Peso: {details?.weight}</Text>
                </View>
            );
        });


    return (
        <View style={styles.container}>
            <View style={styles.cardList}>{pokemonListShow}</View>
            {hasNextPage && (
                <TouchableOpacity
                    onPress={() => fetchNextPage()}
                    style={styles.button}
                    disabled={isFetchingNextPage}
                >
                    <Text style={styles.buttonText}>
                        {isFetchingNextPage ? 'Cargando más...' : 'Cargar más'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    card: {
        width: '45%',
        height: 100,
        backgroundColor: '#eee',
        margin: '2.5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontWeight: 'bold'
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#3db83a',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center'
    }
});

export default PokemonList;
