import React from 'react';
import { TouchableOpacity } from 'react-native';

import Block from './Block';
import Image from './Image';
import Text from './Text';
import { useTheme } from '../hooks';

const PokemonBasicCard = ({ pokemon, onClose }: any) => {
  const { assets, colors, sizes } = useTheme();
  console.log('pokemon', pokemon.image);

  const CARD_WIDTH = sizes.width - 50;

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center'
      }}
      activeOpacity={0}
      onPress={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <Block
        card
        flex={0}
        row={false}
        width={CARD_WIDTH}
        height={500}
      >
        <Image
          resizeMode="cover"
          source={{ uri: pokemon?.sprites?.other?.["official-artwork"]?.front_default }}
          style={{
            height: 110,
            width: '80%',
          }}
        />
        <Block
          paddingTop={sizes.s}
          justify="space-between"
          paddingLeft={0}
          paddingBottom={0}>
          <Block>
            <Text p marginBottom={sizes.sm} bold>
              {pokemon?.name}
            </Text>
            <Text p marginBottom={sizes.s}>
              {`Peso: ${pokemon?.weight}`}
            </Text>
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default PokemonBasicCard;
