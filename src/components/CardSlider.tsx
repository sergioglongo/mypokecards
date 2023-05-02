import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
const window = Dimensions.get('window');

const CardSlider = ({
  children,
  autoplay,
  interval,
  style,
  ...props
}) => {
  const [numOfCards, setNumOfCards] = useState(children?.length);
  const [position, setPosition] = useState(1);
  const slider = useRef(null);
  let canAutoMove = true;
  let t = null;

  useEffect(() => {
    if (autoplay) {
      t = setInterval(() => {
        next();
      }, interval || 3000);
    }
    return () => {
      if (t) {
        clearInterval(t);
      }
    };
  }, []);

  const next = () => {
    if (canAutoMove) {
      slider.current.scrollTo({
        x: (window.width - 30) * position,
        animated: true,
      });
    }
  };

  const scroll = (event) => {
    canAutoMove = false;
    const offsetX:number = event.nativeEvent.contentOffset.x;
    const page = offsetX / (window.width - 30);
    if (page === numOfCards - 1) {
      setPosition(0);
    } else {
      setPosition(page + 1);
    }
    setTimeout(() => {
      canAutoMove = true;
    }, 1000);
  };

  let cards;
  if (children?.length > 1) {
    cards = children.map((item, index) => {
      return (
        <View style={styles.card} key={index}>
          {item}
        </View>
      );
    });
  } else {
    cards = (
      <View style={styles.card}>
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      {...props}
      ref={slider}
      style={[styles.scroll, style]}
      onScroll={(e) => scroll(e)}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={20}
    >
      {cards}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: window.width - 30,
    // height:'100%',
    marginHorizontal: 15,
    overflow: 'visible',
  },
  card: {
    width: window.width - 40,
    marginHorizontal: 5,
    marginVertical: 10,
  }
});

export default CardSlider;
