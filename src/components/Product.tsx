import React from 'react';
import { TouchableOpacity } from 'react-native';

import Block from './Block';
import Image from './Image';
import Text from './Text';
import { IProduct } from '../constants/types';
import { useTheme } from '../hooks/';

const Product = ({ image, title, type, linkLabel, description, height, width }: IProduct) => {
  const { assets, colors, sizes } = useTheme();

  const isHorizontal = type !== 'vertical';
  const CARD_WIDTH = (sizes.width - sizes.padding * 2 );

  return (
    <Block
      card
      flex={0}
      row={isHorizontal}
      marginBottom={sizes.sm}
      width={width || CARD_WIDTH}
      height={height || 'auto'}
      >
      <Image
        resizeMode="cover"
        source={{ uri: image }}
        style={{
          height: isHorizontal ? CARD_WIDTH / 2 : 110,
          width: !isHorizontal ? '100%' : sizes.width / 2.435,
        }}
      />
      <Block
        paddingTop={sizes.s}
        justify="space-between"
        paddingLeft={isHorizontal ? sizes.sm : 0}
        paddingBottom={isHorizontal ? sizes.s : 0}>
        <Block>
          <Text p marginBottom={sizes.sm} bold>
            {title}
          </Text>
          <Text p marginBottom={sizes.s}>
            {description}
          </Text>
        </Block>
        <Block row flex={1} justify='flex-end' width={'100%'} align='flex-end'>
          <TouchableOpacity>
              <Text
                p
                color={colors.link}
                semibold
                size={sizes.linkSize}
                marginRight={sizes.s}>
                {linkLabel || "Detalles"}
              </Text>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  );
};

export default Product;
