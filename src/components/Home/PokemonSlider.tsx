import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { useGetPokemonLimitQuery } from '../../services/API/pokedexApi';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Image from '../Image';
import Product from '../Product';
import CardSlider from '../CardSlider';

const PAGE_SIZE = 5;
const fetchPosts = async (page = 0, limit = PAGE_SIZE) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page}`);
    const data = await response.json();
    const pokemonList = data.results;
    console.log("Carga de pokemonList");

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

function PokemonList({showDetails}) {

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

    const loadMore = () => {
        console.log("Carga de loadMore");
        
        if (!isFetchingNextPage) {
          fetchNextPage();
        }
      };

    if (isLoading) {
        return <Text>Cargando...</Text>;
    }


    const pokemonListShow = data.pages
        .flatMap((page) => page.pokemonList)
        .map((pokemon, index) => {
            const details = data.pages.flatMap((page) => page.pokemonDetails)[index];
            const showDetailsPokemon = () => {
                showDetails(details);
            }
            return (

                <Product
                    id={details?.id}
                    title={details?.name}
                    description={`Peso: ${details?.weight}`}
                    image={details?.sprites?.other?.["official-artwork"]?.front_default}
                    timestamp={details?.weight}
                    linkLabel={"Ver más"}
                    onPress={showDetailsPokemon}
                    type={"horizontal"}
                    height={'auto'}
                    key={details.name}
                />

            );
        });


    return (
        <View style={styles.container}>
            {/* <View style={styles.cardList}>{pokemonListShow}</View> */}
            <CardSlider
                autoplay={false}
                interval={3000}
                style={undefined}
                onEndReached={loadMore}
            >
                {pokemonListShow}
            </CardSlider>
         </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
